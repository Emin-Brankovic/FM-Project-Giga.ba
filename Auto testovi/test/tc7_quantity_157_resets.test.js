import {
    SELECTORS, until, expect, toSetUp
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC7 - Quantity 157 resets", function () {
    this.timeout(60000);

    it("Setting quantity to 157 should be rejected (not remain 157)", async function () {

        const driver = driverContext.driver;
        await toSetUp(driver,"yt 820 crna","yt-820-crna");

        const rowsBefore = await driver.findElements(SELECTORS.cartRow);
        expect(rowsBefore.length).to.be.greaterThan(0);

        const qty = await driver.wait(until.elementLocated(SELECTORS.quantityInput), 10000);

        await qty.clear();
        await qty.sendKeys("157");
        await qty.sendKeys("\t");
        await driver.sleep(2000);

        const currentValue = await qty.getAttribute("value");
        expect(currentValue).to.not.equal("157");
    });
});
