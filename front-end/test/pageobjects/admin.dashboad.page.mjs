import { $ } from '@wdio/globals';
import Page from './page.mjs';
import actions from '../utils/actions.mjs';

class AdminDashboardPage extends Page {

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

    modifyUserByIndex(index) {
        return $(`#user-table-entry-${index} > td >  #edit-user-btn`)
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
        await actions.validateElementText(this.dashboardTitle, "Tabel de Bord Administrator", "strings do not match");
    }

    async createNewUser() {
        await actions.clickElement(this.createUserBtn);
    }

    async validateUserId(index, value) {
        await expect(this.userIdByIndex(index)).toBeDisplayed();
        await actions.validateElementText(this.userIdByIndex(index), value, "id does not match");
    }

    async validateUsername(index, value) {
        await expect(this.usernameByIndex(index)).toBeDisplayed();
        await actions.validateElementText(this.usernameByIndex(index), value, "username does not match");
    }

    async validateUserFullName(index, value) {
        await expect(this.userFullNameByIndex(index)).toBeDisplayed();
        await actions.validateElementText(this.userFullNameByIndex(index), value, "full name does not match");
    }

    async validateUserAuthority(index, value) {
        await expect(this.userAuthorityByIndex(index)).toBeDisplayed();
        await actions.validateElementText(this.userAuthorityByIndex(index), value, "authority does not match");
    }
    async editUserByIndex(index) {
        await actions.clickElement(this.modifyUserByIndex(index));
    }
}

export default new AdminDashboardPage();
