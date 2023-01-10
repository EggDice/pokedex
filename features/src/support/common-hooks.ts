import { ICustomWorld } from './custom-world';
import { config } from './config';
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import {
  request,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import {createTestEnvironment} from './test-environment';


setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);
const testEnviornment = createTestEnvironment()

BeforeAll(testEnviornment.onBeforeAll)

Before({ tags: '@ignore' }, async function () {
  return 'skipped'
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld) {
  const entry$ = await testEnviornment.onBefore(this.world)
  entry$.subscribe(({entry, type}) => this.attach(entry, type))
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL,
  });
});

After(async function (this: ICustomWorld, { result, pickle }: ITestCaseHookParameter) {
  if (result?.status !== Status.PASSED) {
    const testName = pickle.name.replace(/\W/g, '-');
    const { entry, type } = await testEnviornment.onFailure(this.world, testName)
    this.attach(entry, type)
  }
  await this.attach(`Status: ${result?.status}. Duration:${result?.duration?.seconds}s`)
  await testEnviornment.onAfter(this.world)
});

AfterAll(testEnviornment.onAfterAll)
