import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.mjs'
import adminDashboadPage from '../pageobjects/admin-dashboadpage.mjs'
import homePage from '../pageobjects/home.page.mjs'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await loginPage.open()

        await loginPage.login('admin', '12345678')
        await expect(homePage.welcomeText).toBeDisplayed();
        await expect(homePage.platformDescriptionText).toBeDisplayed();
        await homePage.navigateToDashboard();
        await adminDashboadPage.validatePageTitle();
        await adminDashboadPage.validateUserId(0, "1");
    })
})

