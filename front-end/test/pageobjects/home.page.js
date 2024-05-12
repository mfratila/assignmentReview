const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get welcomeText () {
        return $('#welcome-msg');
    }

    get platformDescriptionText () {
        return $('#general-desc');
    }
}

module.exports = new SecurePage();
