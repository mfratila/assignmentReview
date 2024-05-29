import { $ } from '@wdio/globals';
import Page from './page.mjs';
import actions from '../utils/actions.mjs';

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

    get navigateToCourseMaterialBtn() {
        return $('#course-material-btn');
    }

    async validateHomePageTitle() {
        await this.welcomeText.waitForDisplayed();
        await actions.validateElementText(this.welcomeText, "Bine ai venit pe EasyClass");
    }

    async navigateToDashboard() {
        await actions.clickElement(this.navigateToDashboardBtn);
    }

    async navigateToCoursesMaterial() {
        await actions.clickElement(this.navigateToCourseMaterialBtn);
    }

    async validateNavigateButtonText(expectedText) {
        await actions.validateElementText(this.navigateToDashboardBtn, expectedText, "expected text does not match the actual one");
    }
}

export default new HomePage();
