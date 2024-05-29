import { browser } from '@wdio/globals'

class Actions {

    async selectElementAndEnterText(element, text) {
        await element.scrollIntoView();
        await element.waitForDisplayed();
        await browser.pause(500);
        await element.setValue(text);
        await browser.pause(500);
    }

    async clickElement(element) {
        await element.scrollIntoView();
        await element.waitForDisplayed();
        await element.waitForClickable();
        await browser.pause(500);
        await element.click();
    }

    async validateElementText(element, expectedValue, errorMessage) {
        const actualValue = await element.getText();
        await expect(actualValue).toContain(expectedValue, errorMessage);
    }

    async validateElementValue(element, expectedValue, errorMessage) {
        const actualValue = await element.getValue();
        await expect(actualValue).toContain(expectedValue, errorMessage);
    }

}

export default new Actions();