import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('The app is opened', async function (this: ICustomWorld) {
  const page = this.page!
  await page.goto(config.BASE_URL)
  await page.locator('text="Search"').waitFor()
});

Then('{int} pokemons are listed', async function (this: ICustomWorld, count: number) {
  const page = this.page!
  const pokemons = page.getByTestId('listing-pokemon')
  await expect(pokemons).toHaveCount(count)
});
