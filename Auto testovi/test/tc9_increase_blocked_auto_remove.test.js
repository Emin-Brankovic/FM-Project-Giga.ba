import {
    searchAndOpenProduct,
    SELECTORS,
    until,
    expect,
    By
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC9 - Invalid Discount Code Check", function () {
    this.timeout(120000);
    it("Should navigate to checkout and validate invalid discount code", async function () {
        const driver = driverContext.driver;

        await searchAndOpenProduct(driver, "Intel i3", "intel-core-i3");
        await driver.sleep(2000);

        const tierRadio = await driver.wait(until.elementLocated(SELECTORS.qtyOption1), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", tierRadio);


        await driver.wait(until.elementIsVisible(tierRadio), 10000);
        await tierRadio.click();
        await driver.sleep(1500);

        const addToCart = await driver.findElement(SELECTORS.addToCartBtn);
        await addToCart.click();
        await driver.sleep(2000);

        const checkoutBtn = await driver.wait(
            until.elementLocated(SELECTORS.cartDrawerCheckoutBtn),
            15000
        );
        await driver.wait(until.elementIsVisible(checkoutBtn), 15000);

        const plusBtn = await driver.wait(until.elementLocated(SELECTORS.cartPlusBtn), 2000);
        await driver.wait(until.elementIsVisible(plusBtn), 1000);
        await plusBtn.click();
        await driver.sleep(1500);

        const minusBtn = await driver.wait(until.elementLocated(SELECTORS.cartMinusBtn), 2000);
        await driver.wait(until.elementIsVisible(minusBtn), 1000);
        await minusBtn.click();
        await driver.sleep(1500);

        const drawerCount = await driver.wait(until.elementLocated(By.css(".drawer__count")), 5000);
        const countText = await drawerCount.getText();
        expect(countText.trim()).to.equal("0 proizvoda");

    });
});