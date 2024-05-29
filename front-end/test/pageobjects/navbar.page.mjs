import { $ } from '@wdio/globals'
import actions from '../utils/actions.mjs';

class NavigationBar {

    get navbarBrand() {
        return $('#navbar-brand');
    }

    get homeLink() {
        return $('#navbar-home-link');
    }

    get dashboardLink() {
        return $('#navbar-dashboard-link');
    }

    get coursesLink() {
        return $('#navbar-theoretical-courses-link');
    }

    get logoutBtn() {
        return $('#navbar-logout-btn');
    }

    async navigateHome() {
        await actions.clickElement(this.homeLink);
    }

    async navigateToDashboard() {
        await actions.clickElement(this.dashboardLink);
    }

    async navigateToCourses() {
        await actions.clickElement(this.coursesLink);
    }

    async logout() {
        await actions.clickElement(this.logoutBtn);
    }

}

export default new NavigationBar();

