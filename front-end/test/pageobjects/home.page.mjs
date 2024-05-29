import { $ } from '@wdio/globals';
import Page from './page.mjs';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get welcomeText () {
        return $('#welcome-msg');
    }

    get platformDescriptionText () {
        return $('#general-desc');
    }

    get navigateToDashboardBtn() {
        return $('#submit-assignment-btn');
    }

    async navigateToDashboard() {
        await this.navigateToDashboardBtn.waitForDisplayed();
        await this.navigateToDashboardBtn.click();
    }
}

export default new HomePage();
