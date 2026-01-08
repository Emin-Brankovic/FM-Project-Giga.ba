import {
    searchAndOpenProduct,
    SELECTORS,
    until,
    expect,
    By,
    Key
} from "./support/setup.js";
import {driverContext} from "./support/hooks.js";

describe("TC2 - Add CHAHO MASAŽNA GAMING GEJMERSKA STOLICA CRNA and Remove (Cart Logic)", function () {
    this.timeout(100000);

    it("Should search CHAHO MASAŽNA GAMING GEJMERSKA STOLICA CRNA, set quantity to 1, add to cart, and remove it", async function () {

        const driver = driverContext.driver;
        await searchAndOpenProduct(driver, "CHAHO GAMING CRNA", "masazna-chaho-gaming-gejmerska-stolica-crna");
        //await driver.sleep(2000);

        const tierRadio = await driver.wait(until.elementLocated(SELECTORS.qtyOption1), 20000);

        await driver.wait(until.elementIsVisible(tierRadio), 10000);
        await tierRadio.click();
        await driver.sleep(1500);

        const addToCart = await driver.findElement(SELECTORS.addToCartBtn);
        await addToCart.click();
        await driver.sleep(2000);

        const cartRemoveBtn = await driver.findElement(SELECTORS.cartRemoveBtn);
        await cartRemoveBtn.click();
        await driver.sleep(2000);

        const emptyCartText = await driver.wait(until.elementLocated(By.css("p.cart__empty-text")), 5000);
        const emptyText = await emptyCartText.getText();
        expect(emptyText).to.include("Vaša Košarica je prazna");


    });
});