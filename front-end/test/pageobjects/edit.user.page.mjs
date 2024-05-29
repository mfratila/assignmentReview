import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';
import Page from './page.mjs';

class UserEditingPage extends Page{

    get pageTitle() {
        return $('#user-creation-title');
    }

    get emailInput() {
        return $('#email-input');
    }

    get fullNameInput() {
        return $('#fullname-input');
    }

    get rolesDropdownbtn() {
        return $('#roles-dropdown-btn');
    }

    get createUserBtn() {
        return $('#confirm-create-user-btn');
    }

    get backBtn() {
        return $('#back-btn');
    }

    getRoleSelectionByIndex(index) {
        return $(`#role-dropdown-selection-${index}`);
    }

    async validatePageTitle() {
        await expect(this.pageTitle).toBeDisplayed();
        await actions.validateElementText(this.pageTitle, "Create User", "strings to not match");
    }

    async editExistingUser(email, fullName, roleIndex) {
        await actions.selectElementAndEnterText(this.emailInput, email);
        await actions.selectElementAndEnterText(this.fullNameInput, fullName);
        await actions.clickElement(this.rolesDropdownbtn);
        await actions.clickElement(this.getRoleSelectionByIndex(roleIndex));
        await actions.clickElement(this.createUserBtn);
    }
}

export default new UserEditingPage();