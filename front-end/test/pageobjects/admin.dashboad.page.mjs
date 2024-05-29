import { $, $$ } from '@wdio/globals';
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

    get listOfUsers() {
        return $$('#users-table > tbody > tr');
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

    usernameByText(text) {
        return $(`//td[contains(text(), "${text}") and @id="user-username"]`);
    }

    roleByText(text) {
        return $(`//td[contains(text(), "${text}") and @id="user-authority"]`);
    }

    fullNameByText(text) {
        return $(`//td[contains(text(), "${text}") and @id="user-fullname"]`);
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

    async validateUserIsPresentInTheTable(username, role, fullName) {
        await expect(this.usernameByText(username)).toBeDisplayed();
        await expect(this.roleByText(role)).toBeDisplayed();
        await expect(this.fullNameByText(fullName)).toBeDisplayed();
    }

    async getLastIndex() {
        const usersListLength = await this.listOfUsers;
        console.log("length of users list: " + usersListLength.length);
        return usersListLength.length - 1;
    }
}

export default new AdminDashboardPage();
