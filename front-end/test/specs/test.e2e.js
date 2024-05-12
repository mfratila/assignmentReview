const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/home.page')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('mihai.fratila01@gmail.com', '12345678')
        await expect(HomePage.welcomeText).toBeDisplayed();
        await expect(HomePage.platformDescriptionText).toBeDisplayed();
    })
})

