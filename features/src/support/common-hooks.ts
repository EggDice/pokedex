import { ICustomWorld } from './custom-world';
import { config } from './config';
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import {
  request,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import {createTestEnvironment} from './test-environment';


setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);
const testEnviornment = createTestEnvironment()

BeforeAll(testEnviornment.beforeAll)

Before({ tags: '@ignore' }, async function () {
  return 'skipped'
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld) {
  await testEnviornment.before((...args) => this.attach(...args), this.world)
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL,
  });
});

After(async function (this: ICustomWorld, testCase: ITestCaseHookParameter) {
  await testEnviornment.after((...args) => this.attach(...args), this.world, testCase)
});

AfterAll(testEnviornment.afterAll)
