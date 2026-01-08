import { Builder, Browser, By, until, Key } from "selenium-webdriver";
import { expect } from "chai";

export const BASE_URL = "https://www.giga.ba";

// hardcoded credentials (as requested)
const LOGIN_EMAIL = "almedin2306@gmail.com";
const LOGIN_PASSWORD = "test123";

export const INFINITY_STOLICA_URL="https://giga.ba/products/infinity-kancelarijska-stolica-yt-820-crna?variant=43687263174832"
export const INTEL_I3="https://giga.ba/products/procesor-za-cpu-intel-core-i3-12100f-3-3ghz?_pos=1&_sid=c1e4ac3c3&_ss=r"

export const SELECTORS = {
    // // LOGIN
    // customerEmail: By.id("CustomerEmail"),
    // customerPassword: By.id("CustomerPassword"),
    // loginSubmitBtn: By.css("button.login__sign-in"),

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
    // Simulate searching by going to the search URL (more reliable than finding the search bar icon)
    await driver.get(`${BASE_URL}/search?q=${productName}`);

    // Find the product card based on the partial link href provided in your HTML
    const productLink = await driver.wait(
        until.elementLocated(By.css(`a[href*='${urlPart}']`)),
        10000
    );
    await productLink.click();

    // Wait for product page to load (look for add to cart)
    await driver.wait(until.elementLocated(SELECTORS.addToCartBtn), 10000);
}

export async function login(driver) {
    await driver.get(BASE_URL);
    await driver.get(`${BASE_URL}/account/login`);

    const emailInput = await driver.wait(until.elementLocated(SELECTORS.customerEmail), 10000);
    await emailInput.clear();
    await emailInput.sendKeys(LOGIN_EMAIL);

    const passInput = await driver.findElement(SELECTORS.customerPassword);
    await passInput.clear();

    // Enter submit
    await passInput.sendKeys(LOGIN_PASSWORD, Key.ENTER);

    await driver.wait(async () => {
        const url = await driver.getCurrentUrl();
        return !url.includes("/account/login");
    }, 15000);
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

export async function toSetUp(driver,url) {
    await driver.get(url);

    // 2) Click quantity option (id=quantity-option-0)
    const qtyOption = await driver.wait(until.elementLocated(By.id("quantity-option-0")), 10000);
    await qtyOption.click();

    // 3) Click Add to cart button (class: product-form__submit button, name=add)
    const addBtn = await driver.wait(
        until.elementLocated(By.css("button.product-form__submit.button")),
        15000
    );
    await addBtn.click();

// --- Wait for cart drawer / modal to appear ---
    const goToBasketBtn = await driver.wait(
        async () => {
            try {
                const el = await driver.findElement(By.css(".cart__link.button.button--simple"));
                return (await el.isDisplayed()) ? el : null;
            } catch (err) {
                // if element not found yet, keep waiting
                return null;
            }
        },
        15000,
        "Go-to-basket button did not appear after adding item"
    );



// Now click safely
    await goToBasketBtn.click();
}

export { By, until, Key, expect };
