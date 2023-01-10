import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { BrowserContext, chromium, firefox, webkit } from '@playwright/test'
import type {ChromiumBrowser, FirefoxBrowser, Page, WebKitBrowser} from '@playwright/test'
import {ensureDir} from 'fs-extra'
import {config} from './config'
import {fromEventPattern, map, Observable} from 'rxjs'

export type WebWorld = {
  browser: WorldBrowser
}

export type WorldBrowser = {
  page: Page
  context: BrowserContext
}

const tracesDir = 'reports/traces'

export const createWebWorld = (): WebWorld => {
  const browser = createWorldBrowser()
  return {
    browser
  }
}

export const createWorldBrowser = (): WorldBrowser => {
  let _page: Page | undefined
  let _context: BrowserContext | undefined
  return {
    get page() {
      if (!_page) {
        throw new Error('The page is not set, it is likely that the browser is not started')
      }
      return _page
    },
    set page(page: Page) {
      _page = page
    },
    get context() {
      if (!_context) {
        throw new Error('The context is not set, it is likely that the browser is not started')
      }
      return _context
    },
    set context(context: BrowserContext) {
      _context = context
    }
  }
}

export type ReportEntry =
  | {
    entry: string,
    type: 'text/plain',
  }
  | {
    entry: Buffer,
    type: 'image/png',
  }

export type TestEnviornment = {
  onBeforeAll: () => Promise<void>
  onAfterAll: () => Promise<void>
  onBefore: (world: WebWorld) => Promise<Observable<ReportEntry>>
  onAfter: (world: WebWorld) => Promise<void>
  onFailure: (world: WebWorld, testName: string) => Promise<ReportEntry>
}

export const createTestEnvironment = (): TestEnviornment => {
  const devServer: DevServer = createDevServer()
  const browser: Browser = createBrowser()
  return {
    onBeforeAll: async () => {
      await devServer.start()
      await browser.start()
    },
    onAfterAll: async () => {
      await browser.stop()
      await devServer.stop()
    },
    onBefore: async (world) => {
      const { page, context, $console } = await browser.getPageAndContext()
      world.browser.context = context
      world.browser.page = page
      return $console.pipe(
        map((log) => ({
          entry: `console -> ${log}`,
          type: 'text/plain',
        }))
      )
    },
    onAfter: async (world) => {
      await browser.stopPageAndContext(world.browser)
    },
    onFailure: async (world, testName) => {
      const image: Buffer = await world.browser.page.screenshot()
      await world.browser.context.tracing.stop({
        path: `${tracesDir}/${testName}-${
          (new Date).toISOString().split('.')[0]
        }-trace.zip`,
      });
      return {
        entry: image,
        type: 'image/png',
      }
    },
  }
}

type Browser = {
  start: () => Promise<void>
  stop: () => Promise<void>
  getPageAndContext: () => Promise<{
    page: Page,
    context: BrowserContext,
    $console: Observable<string>,
  }>
  stopPageAndContext: (args: { page: Page, context: BrowserContext }) => Promise<void>
}

const createBrowser = (): Browser => {
  let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser


  return {
    start: async () => {
      switch (config.browser) {
        case 'firefox':
          browser = await firefox.launch(config.browserOptions)
          break;
        case 'webkit':
          browser = await webkit.launch(config.browserOptions)
          break;
        default:
          browser = await chromium.launch(config.browserOptions)
      }
      await ensureDir(tracesDir)
    },
    stop: async () => {
      await browser.close()
    },
    getPageAndContext: async () => {
      const context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: process.env.PWVIDEO ? { dir: 'reports/screenshots' } : undefined,
        viewport: { width: 1200, height: 800 },
      })
      await context.tracing.start({ screenshots: true, snapshots: true });
      const page = await context.newPage()
      const $console: Observable<string> = fromEventPattern(
        (handler) =>
          page.on('console', (msg) => {
            handler(`${msg.type()}: ${msg.text()}`)
          })
      )
      return { page, context, $console }
    },
    stopPageAndContext: async ({ page, context }) => {
      await page.close()
      await context.close()
    }
  }
}

type DevServer = {
  start: (port?: number) => Promise<void>
  stop: () => Promise<void>
}

const createDevServer = (): DevServer => {
  let viteDevServer: ViteDevServer

  return {
    start: async (port) => {
      viteDevServer = await createServer({
          // TODO: find a better way
          root: __dirname + '/../../../',
          server: {
            port: port ?? 5000,
          },
          logLevel: 'silent',
        })
        await viteDevServer.listen()
    },
    stop: async () => {
      viteDevServer.close()
    },
  }
}
