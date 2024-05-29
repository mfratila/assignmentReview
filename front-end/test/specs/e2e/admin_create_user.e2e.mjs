import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import adminDashboardPage from '../../pageobjects/admin.dashboad.page.mjs'
import userCreationPage from '../../pageobjects/admin.create.user.page.mjs';
import testdata from '../../utils//testdata.json'  with { type: "json" }


describe('Verify user creation by admin functionality', () => {
    it('The admin should be able to navigate to the dashboard and create a new user', async function() {
        await loginPage.open()

        await loginPage.login(testdata.administratorUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Mergi la Tabelul de Bord cu Utilizatori");
        await homePage.navigateToDashboard();

        await adminDashboardPage.validatePageTitle();
        await adminDashboardPage.createNewUser();

        await userCreationPage.validatePageTitle();
        await userCreationPage.createNewUser("newuser@gmail.com", "New User", "12345678", "1");
        await adminDashboardPage.validateUserIsPresentInTheTable("newuser@gmail.com", "ROLE_STUDENT", "New User");
    })

})