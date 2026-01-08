import { createDriver, disposeDriver } from "./setup.js";
import { beforeEach,afterEach } from 'mocha';

export const driverContext = {
    driver: null
};

beforeEach(async function() {
    console.log("HOOKS: Creating driver...");
    driverContext.driver = await createDriver();
    console.log("HOOKS: Driver created!");
    this.driver = driverContext.driver;
});

afterEach(async function() {
    console.log("HOOKS: Disposing driver...");
    await disposeDriver(driverContext.driver);
    driverContext.driver = null;
});