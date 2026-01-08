import {
    createDriver, disposeDriver,
    SELECTORS, until, expect, toSetUp, openCheckoutFromCart, BASE_URL, By, INFINITY_STOLICA_URL
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC8 - Return to Cart from Checkout", function () {
    this.timeout(60000);

    it("Should navigate to checkout and return back to cart successfully", async function () {
        const driver = driverContext.driver;
        await toSetUp(driver,INFINITY_STOLICA_URL);

        await openCheckoutFromCart(driver);
        
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain("checkouts");

        await driver.get(`${BASE_URL}/cart`);

        await driver.wait(until.elementLocated(SELECTORS.cartRow), 10000);
        
        const rowsAfterReturn = await driver.findElements(SELECTORS.cartRow);
        
        expect(rowsAfterReturn.length).to.be.greaterThan(0, "Artikli bi trebali ostati u korpi nakon povratka sa checkouta.");
        
        const finalUrl = await driver.getCurrentUrl();
        expect(finalUrl).to.contain("/cart");
    });
});