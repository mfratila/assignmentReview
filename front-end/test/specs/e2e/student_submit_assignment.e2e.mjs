import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import studentDashboardPage from '../../pageobjects/student.dashboard.page.mjs';
import studentAssignmentViewPage from '../../pageobjects/student.assignment.view.page.mjs';
import testdata from '../../utils//testdata.json'  with { type: "json" }

describe('Student assignment functionality', () => {

    it('a student should be able to create a new assignment and send it to review', async () => {
        await loginPage.open()

        await loginPage.login(testdata.studentUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Depune o Temă");
        await homePage.navigateToDashboard();

        await studentDashboardPage.validatePageTitle();
        await studentDashboardPage.createNewAssignment();

        const assignmentNumber = "11";
        const githubUrl = "https://github.com/some-repo";
        const githubBranch = "main"

        await studentAssignmentViewPage.validateStatusBadgeText("În așteptarea trimiterii");
        await studentAssignmentViewPage.fillAssignment(assignmentNumber, githubUrl, githubBranch);
        await studentAssignmentViewPage.validateStatusBadgeText("Trimis");
        await studentAssignmentViewPage.goBack();

        await studentDashboardPage.validateAssignmentTitle(assignmentNumber, "Lucrarea #11");
        await studentDashboardPage.validateAssignmentStatusBadge(assignmentNumber, "Trimis");
        await studentDashboardPage.validateAssignmentGithubUrl(assignmentNumber, githubUrl);
        await studentDashboardPage.validateAssignmentBranch(assignmentNumber, githubBranch);
    })


})

