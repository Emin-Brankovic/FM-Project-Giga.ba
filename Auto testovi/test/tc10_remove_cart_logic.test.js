import {
    searchAndOpenProduct,
    SELECTORS,
    until,
    expect,
    By,
} from "./support/setup.js";

import { driverContext } from "./support/hooks.js";

describe("TC10 - Add YT-9050 and Remove (Cart Logic)", function () {
    this.timeout(60000);
    it("Should search YT-9050, set quantity to 3, add to cart, and remove it", async function () {

        const driver = driverContext.driver;
        await searchAndOpenProduct(driver, "YT-9050", "yt-9050");
        await driver.sleep(2000);

        const tierRadio = await driver.wait(until.elementLocated(SELECTORS.qtyTierOption2to4), 10000);
        await driver.wait(until.elementIsVisible(tierRadio), 10000);
        await tierRadio.click();
        await driver.sleep(1500);

        const plusBtnVariant = await driver.wait(
            until.elementLocated(SELECTORS.qtyPlusBtnVariant),
            5000
        );
        await driver.wait(until.elementIsVisible(plusBtnVariant), 5000);
        await plusBtnVariant.click();


        const addToCart = await driver.findElement(SELECTORS.addToCartBtn);
        await addToCart.click();
        await driver.sleep(2000);

        const cartRemoveBtn = await driver.findElement(SELECTORS.cartRemoveBtn);
        await cartRemoveBtn.click();
        await driver.sleep(2000);

        const emptyCartText = await driver.wait(until.elementLocated(By.css("p.cart__empty-text")), 5000);
        const emptyText = await emptyCartText.getText();
        expect(emptyText).to.include("prazna");


    });
});