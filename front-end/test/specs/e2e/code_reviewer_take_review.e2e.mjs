import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import studentDashboardPage from '../../pageobjects/student.dashboard.page.mjs';
import studentAssignmentViewPage from '../../pageobjects/student.assignment.view.page.mjs';
import navigationBar from '../../pageobjects/navbar.page.mjs'
import codeReviewerDashboard from '../../pageobjects/code.reviewer.dashboard.page.mjs'
import codeReviewerAssignmentView from '../../pageobjects/code.reviewer.assignmment.view.page.mjs'
import testdata from '../../utils//testdata.json'  with { type: "json" }

describe('Student assignment functionality', () => {

    it('a code reviewer should be able to take to his name assignments that are awaiting review', async () => {
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

        await navigationBar.logout();
        await loginPage.login(testdata.codeReviewerUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Mergi la Temele Depuse");
        await homePage.navigateToDashboard();

        await codeReviewerDashboard.validatePageTitle();
        await codeReviewerDashboard.validateAwaitingReviewAssignmentStatusBadge(assignmentNumber, "Trimis");
        await codeReviewerDashboard.validateAwaitingReviewAssignmentTitle(assignmentNumber, "Lucrarea #11");
        await codeReviewerDashboard.validateAwaitingReviewAssignmentGithubUrl(assignmentNumber, githubUrl);
        await codeReviewerDashboard.validateAwaitingReviewAssignmentBranch(assignmentNumber, githubBranch);
        await codeReviewerDashboard.validateAwaitingReviewAssignmentStudentName(assignmentNumber, "Mihai Fratila");

        await codeReviewerDashboard.modifyAwaitingReviewAssignment(assignmentNumber);
        await browser.pause(2000);
        await codeReviewerDashboard.validateInReviewAssignmentTitle(assignmentNumber, "Lucrarea #11");
        await codeReviewerDashboard.validateInReviewAssignmentStatusBadge(assignmentNumber, "In Revizuire");
        await codeReviewerDashboard.validateInReviewAssignmentGithubUrl(assignmentNumber, githubUrl);
        await codeReviewerDashboard.validateInReviewAssignmentBranch(assignmentNumber, githubBranch);
        await codeReviewerDashboard.validateInReviewAssignmentStudentName(assignmentNumber, "Mihai Fratila");
        await codeReviewerDashboard.modifyInReviewAssignmment(assignmentNumber);
    })


})

