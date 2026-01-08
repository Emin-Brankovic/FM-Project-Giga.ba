import {
    SELECTORS, until, expect, By, Key, toSetUp
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC4 - Required phone input", function () {
    this.timeout(60000);

    it("Phone field should show validation error when invalid/empty", async function () {
        const driver = driverContext.driver;
        await toSetUp(driver,"yt 820 crna","yt-820-crna");

        const qty = await driver.wait(until.elementLocated(SELECTORS.quantityInput), 10000);

        await qty.sendKeys(Key.ENTER);
        await driver.sleep(1000);


        const phone = await  driver.findElement(By.name("phone"),1000);
        await phone.sendKeys("1")
        await phone.sendKeys(Key.BACK_SPACE);
        await phone.sendKeys("\t");

        expect(await phone.getAttribute("aria-invalid")).to.equal("true");

        const err = await driver.wait(until.elementLocated(By.css("#error-for-TextField6")), 10000);
        expect(await err.isDisplayed()).to.be.true;

        await driver.sleep(2000);
    });
});
