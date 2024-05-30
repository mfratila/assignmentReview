import { $ } from '@wdio/globals'
import Page from './page.mjs';
import actions from '../utils/actions.mjs';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#formBasicEmail');
    }

    get inputPassword () {
        return $('#formBasicPassword');
    }

    get btnSubmit () {
        return $('//button[@id="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await actions.selectElementAndEnterText(this.inputUsername, username);
        await actions.selectElementAndEnterText(this.inputPassword, password);
        await actions.clickElement(this.btnSubmit);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open () {
        return await super.open('login');
    }
}

export default new LoginPage();
