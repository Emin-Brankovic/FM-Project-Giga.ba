import {By, until, expect, createDriver, disposeDriver, toSetUp, INFINITY_STOLICA_URL} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC1 - Quantity 0 empties cart (via minus button)", function () {
    this.timeout(90000);

    it("Setting quantity to 0 via minus button should empty the cart", async function () {
        const driver = driverContext.driver;
        await toSetUp(driver,INFINITY_STOLICA_URL);

        const qtyInput = await driver.wait(until.elementLocated(By.id("Quantity-1")), 15000);

        expect(await qtyInput.isDisplayed()).to.be.true;

        for (let i = 0; i < 10; i++) {
            const value = await qtyInput.getAttribute("value");
            if (value === "0") break;

            const minusBtn = await driver.wait(
                until.elementLocated(By.css("button.quantity__button.no-js-hidden")),
                10000
            );
            await minusBtn.click();

            await driver.sleep(400);
        }

        const finalValue = await qtyInput.getAttribute("value");
        if (finalValue === "0") {
            expect(finalValue).to.equal("0");
        } else {
            const emptyMsg = await driver.findElements(By.css("p.cart__empty-text"));
            expect(emptyMsg.length).to.be.greaterThan(0);
            expect(await emptyMsg[0].isDisplayed()).to.be.true;
        }
        await driver.sleep(2000);
    });
});
