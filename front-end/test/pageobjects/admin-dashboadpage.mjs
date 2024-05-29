import { $ } from '@wdio/globals';
import Page from './page.mjs';

class AdminDashboardPage extends Page {

    // elements
    get logutBtn() {
        return $('#logout-btn');
    }

    get dashboardTitle() {
        return $('#dashboard-title');
    }

    get dashboardDescription() {
        return $('#dashboard-desc');
    }

    get createUserBtn() {
        return $('#create-user-btn');
    }

    get tableTitle() {
        return $('#table-title');
    }

    tableRowByIndex(index) {
        return $(`#user-table-entry-${index}`);
    }

    userIdByIndex(index) {
        return $(`#user-table-entry-${index} > #user-id`);
    }

    usernameByIndex(index) {
        return $(`#user-table-entry-${index} > #user-username`);
    }

    userAuthorityIndex(index) {
        return $(`#user-table-entry-${index} > #user-authority`);
    }

    userFullNameByIndex(index) {
        return $(`#user-table-entry-${index} > #user-fullname`);
    }

    // methods


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('dashboard');
    }

    async validatePageTitle() {
        await expect(this.dashboardTitle).toBeDisplayed();
    }

    async validateUserId(index, value) {
        await expect(this.userIdByIndex(index)).toContain(expect.stringContaining(value));
    }
}

export default new AdminDashboardPage();
