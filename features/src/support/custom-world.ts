import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { APIRequestContext } from '@playwright/test';
import {createWebWorld} from './test-environment';
import type {WebWorld} from './test-environment';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;

  server?: APIRequestContext;

  world: WebWorld
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
  world = createWebWorld()
}

setWorldConstructor(CustomWorld);
