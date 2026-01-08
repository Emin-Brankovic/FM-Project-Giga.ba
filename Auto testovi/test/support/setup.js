import { Builder, Browser, By, until, Key } from "selenium-webdriver";
import { expect } from "chai";

export const BASE_URL = "https://www.giga.ba";

export const SELECTORS = {
    // CART
    cartRow: By.css("tr.cart-item"),
    quantityInput: By.css("input.quantity__input[name='updates[]']"),
    emptyCartText: By.css("p.cart__empty-text"),
    checkoutButtonCart: By.css("button.cart__checkout-button[name='checkout']"),
    addToCartBtn: By.css("button[name='add']"),
    qtyOption1: By.id("quantity-option-0"),
    cartRemoveBtn: By.css("button.link[aria-label*='Ukloni']"),

    // CHECKOUT
    shippingFormRoot: By.id("shippingAddressForm"),
    postalCodeInput: By.name("postalCode"),
    phoneInput: By.css("#TextField6, input[name='phone']"),

    qtyTierOption2to4: By.id("quantity-option-1"),
    qtyPlusBtnVariant: By.xpath("//input[@id='lb-qty-selector-variant-quantity-input']/following-sibling::button[contains(@class, 'lb-qty-selector-variant-quantity-btn')]"),
    cartDrawerCheckoutBtn: By.id("CartDrawer-Checkout"),
    cartMinusBtn: By.css("#CartDrawer-Form button[name='minus']"),
    cartPlusBtn: By.css("#CartDrawer-Form button[name='plus']"),
    discountInput: By.name("reductions"),
    applyDiscountBtn: By.css("button[aria-label='Apply Discount Code']"),
    qtyPlusBtn:By.name("plus")

};

export async function createDriver() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 8000 });
    return driver;
}

export async function disposeDriver(driver) {
    if (driver) await driver.quit();
}

export async function searchAndOpenProduct(driver, productName, urlPart) {
    await driver.get(`${BASE_URL}/search?q=${productName}`);

    const productLink = await driver.wait(
        until.elementLocated(By.css(`a[href*='${urlPart}']`)),
        10000
    );
    await productLink.click();

    await driver.wait(until.elementLocated(SELECTORS.addToCartBtn), 10000);
}


export async function openCart(driver) {
    await driver.get(`${BASE_URL}/cart`);
    await driver.wait(until.elementLocated(By.css("main#MainContent")), 10000);
}

export async function openCheckoutFromCart(driver) {
    await openCart(driver);

    const rows = await driver.findElements(SELECTORS.cartRow);
    expect(rows.length).to.be.greaterThan(0);

    const checkoutBtn = await driver.wait(
        until.elementLocated(SELECTORS.checkoutButtonCart),
        10000
    );
    await checkoutBtn.click();

    await driver.wait(until.elementLocated(SELECTORS.shippingFormRoot), 15000);
}

export async function blur(driver) {
    await driver.actions().sendKeys(Key.TAB).perform();
}

export async function toSetUp(driver,productName,urlPart) {

    await driver.get(`${BASE_URL}/search?q=${productName}`);

    const productLink = await driver.wait(
        until.elementLocated(By.css(`a[href*='${urlPart}']`)),
        10000
    );
    await productLink.click();

    const qtyOption = await driver.wait(until.elementLocated(By.id("quantity-option-0")), 10000);
    await qtyOption.click();

    const addBtn = await driver.wait(
        until.elementLocated(By.css("button.product-form__submit.button")),
        15000
    );
    await addBtn.click();

    const goToBasketBtn = await driver.wait(
        async () => {
            try {
                const el = await driver.findElement(By.css(".cart__link.button.button--simple"));
                return (await el.isDisplayed()) ? el : null;
            } catch (err) {
                return null;
            }
        },
        15000,
        "Go-to-basket button did not appear after adding item"
    );



    await goToBasketBtn.click();
}

export { By, until, Key, expect };
