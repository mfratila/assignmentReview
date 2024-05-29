import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import adminDashboardPage from '../../pageobjects/admin.dashboad.page.mjs'
import userCreationPage from '../../pageobjects/admin.create.user.page.mjs';
import userEditPage from '../../pageobjects/admin.edit.user.page.mjs';
import testdata from '../../utils//testdata.json'  with { type: "json" }


describe('Verify user editing by admin functionality', () => {
    it('The admin should be able to navigate to the dashboard and edit an existing user', async function() {
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
        const lastIndex = await adminDashboardPage.getLastIndex();
        await adminDashboardPage.editUserByIndex(lastIndex);
        await userEditPage.validatePageTitle();
        await userEditPage.editExistingUser("editednewuser@gmail.com", "Edited New User", "2");
        await adminDashboardPage.validateUserIsPresentInTheTable("editednewuser@gmail.com", "ROLE_CODE_REVIEWER", "Edited New User");

    });

});