import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import navigationBar from '../../pageobjects/navbar.page.mjs'
import testdata from '../../utils//testdata.json'  with { type: "json" }

describe('Verify login functionality', () => {

    it('a student should be able to login with valid credentials', async () => {
        await loginPage.open()

        await loginPage.login(testdata.studentUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Depune o Temă");
        await navigationBar.logout();
    })

    it('a code reviewer should be able to login with valid credentials', async () => {
        await loginPage.open()

        await loginPage.login(testdata.codeReviewerUsername, testdata.password)
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Mergi la Temele Depuse");
        await navigationBar.logout();
    })

    it('an administrator should be able to login with valid credentials', async () => {
        await loginPage.open()

        await loginPage.login(testdata.administratorUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Mergi la Tabelul de Bord cu Utilizatori");
        await navigationBar.logout();
    })
})

