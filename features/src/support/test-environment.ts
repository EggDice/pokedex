import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { BrowserContext, chromium, firefox, webkit } from '@playwright/test'
import type {ChromiumBrowser, FirefoxBrowser, Page, WebKitBrowser} from '@playwright/test'
import {ICreateAttachment} from '@cucumber/cucumber/lib/runtime/attachment_manager'
import {ensureDir} from 'fs-extra'
import {config} from './config'
import {ITestCaseHookParameter, Status} from '@cucumber/cucumber'

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

export type TestEnviornment = {
  beforeAll: () => Promise<void>
  afterAll: () => Promise<void>
  before: (attach: ICreateAttachment, world: WebWorld) => Promise<void>
  after: (attach: ICreateAttachment, world: WebWorld, testCase: ITestCaseHookParameter) => Promise<void>
}

export const createTestEnvironment = (): TestEnviornment => {
  const devServer: DevServer = createDevServer()
  const browser: Browser = createBrowser()
  return {
    beforeAll: async () => {
      await devServer.start()
      await browser.start()
    },
    afterAll: async () => {
      await browser.stop()
      await devServer.stop()
    },
    before: async (attach, world) => {
      const { page, context } = await browser.getPageAndContext(attach)
      world.browser.context = context
      world.browser.page = page
    },
    after: async (attach, world, { result, pickle }) => {
      if (result) {
        await attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`)
        if (result.status !== Status.PASSED) {
          const image = await world.browser.page.screenshot();
          if (image) {
            await attach(image, 'image/png')
          }
          const testName = pickle.name.replace(/\W/g, '-');
          await world.browser.context.tracing.stop({
            path: `${tracesDir}/${testName}-${
              (new Date).toISOString().split('.')[0]
            }-trace.zip`,
          });
        }
      }
      await browser.stopPageAndContext(world.browser)
    }
  }
}

type Browser = {
  start: () => Promise<void>
  stop: () => Promise<void>
  getPageAndContext:
    (attach: ICreateAttachment) => Promise<{ page: Page, context: BrowserContext }>
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
    getPageAndContext: async (attach) => {
      const context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
        viewport: { width: 1200, height: 800 },
      })
      await context.tracing.start({ screenshots: true, snapshots: true });
      const page = await context.newPage()
      page.on('console', async (msg) => {
        if (msg.type() === 'log') {
          await attach(msg.text())
        }
      })
      return { page, context }
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
