import {
    SELECTORS, until, expect, toSetUp,
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC3 - Quantity 3.5 resets", function () {
    this.timeout(60000);

    it("Setting quantity to 3.5 should be rejected (not remain 3.5)", async function () {
        const driver = driverContext.driver;
        await toSetUp(driver,"yt 820 crna","yt-820-crna");

        const rowsBefore = await driver.findElements(SELECTORS.cartRow);
        expect(rowsBefore.length).to.be.greaterThan(0);

        let qty = await driver.wait(
            until.elementLocated(SELECTORS.quantityInput),
            10000
        );

        await qty.clear();
        await qty.sendKeys("3.5");
        await qty.sendKeys("\t");

        await driver.sleep(1000);

        qty = await driver.wait(
            until.elementLocated(SELECTORS.quantityInput),
            10000
        );

        const currentValue = await qty.getAttribute("value");
        expect(currentValue).to.not.equal("3.5");
    });

});
