import {
    createDriver,
    disposeDriver,
    searchAndOpenProduct,
    SELECTORS,
    until,
    expect,
    By,
    Key
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC6 - Invalid Discount Code Check", function () {
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

        const checkoutBtnFinal = await driver.wait(until.elementLocated(SELECTORS.cartDrawerCheckoutBtn), 10000);
        await driver.wait(until.elementIsVisible(checkoutBtnFinal), 10000);
        await driver.wait(until.elementIsEnabled(checkoutBtnFinal), 10000);
        await checkoutBtnFinal.click();

        const discountInput = await driver.wait(until.elementLocated(SELECTORS.discountInput), 15000);
        await driver.wait(until.elementIsVisible(discountInput), 15000);

        await discountInput.click();
        await discountInput.sendKeys("INVALID", Key.TAB);
        const applyBtn = await driver.wait(until.elementLocated(SELECTORS.applyDiscountBtn), 10000);
        await driver.wait(until.elementIsEnabled(applyBtn), 5000);
        await applyBtn.click();

        const errorElement = await driver.wait(until.elementLocated(By.id("error-for-ReductionsInput0")),5000);
        await driver.wait(until.elementIsVisible(errorElement), 3000);
        const errorText = await errorElement.getText();
        await driver.sleep(2000);
        expect(errorText).to.include("Enter a valid discount code");

        // 9. Click "Završite narudžbu" button
        /*

        const payBtn = await driver.wait(until.elementLocated(SELECTORS.payButton), 10000);
        await payBtn.click();
        */

    });
});