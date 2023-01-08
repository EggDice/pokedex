import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('The app is opened', async function (this: ICustomWorld) {
  await this.world.browser.page.route('https://pokeapi.co/api/v2/pokemon/*', route => route.fulfill({
    status: 200,
    body: JSON.stringify({results: Array.from({length: 151}, (_, i) => ({name: `${i}`}))}),
  }));
  await this.world.browser.page.goto(config.BASE_URL)
  await this.world.browser.page.locator('text="Search"').waitFor()
});

Then('{int} pokemons are listed', async function (this: ICustomWorld, count: number) {
  //this.world.browser.page
  const pokemons = this.world.browser.page.getByTestId('listing-pokemon')
  await expect(pokemons).toHaveCount(count)
});
