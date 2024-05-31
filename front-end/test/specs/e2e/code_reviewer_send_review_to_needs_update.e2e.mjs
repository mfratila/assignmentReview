import loginPage from '../../pageobjects/login.page.mjs'
import homePage from '../../pageobjects/home.page.mjs'
import studentDashboardPage from '../../pageobjects/student.dashboard.page.mjs';
import studentAssignmentViewPage from '../../pageobjects/student.assignment.view.page.mjs';
import navigationBar from '../../pageobjects/navbar.page.mjs'
import codeReviewerDashboard from '../../pageobjects/code.reviewer.dashboard.page.mjs'
import codeReviewerAssignmentView from '../../pageobjects/code.reviewer.assignmment.view.page.mjs'
import testdata from '../../utils/testdata.json'  with { type: "json" }

describe('Student assignment functionality', () => {

    it('a student should be able to create a new assignment and send it to review', async () => {
        await loginPage.open()

        await loginPage.login(testdata.studentUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Depune o Temă");
        await homePage.navigateToDashboard();

        await studentDashboardPage.validatePageTitle();
        await studentDashboardPage.createNewAssignment();

        const assignmentNumber = "1";
        const githubUrl = "https://github.com/some-repo";
        const githubBranch = "main"

        await studentAssignmentViewPage.validateStatusBadgeText("În așteptarea trimiterii");
        await studentAssignmentViewPage.fillAssignment(assignmentNumber, githubUrl, githubBranch);
        await studentAssignmentViewPage.validateStatusBadgeText("Trimis");
        await studentAssignmentViewPage.goBack();

        await studentDashboardPage.validateAssignmentTitle(assignmentNumber, `Lucrarea #${assignmentNumber}`);
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
        await codeReviewerDashboard.modifyAwaitingReviewAssignment(assignmentNumber);
        await browser.pause(2000);
        await codeReviewerDashboard.modifyInReviewAssignmment(assignmentNumber);
        await browser.pause(4000);
        await codeReviewerAssignmentView.validatePageTitle(`Lucrarea #${assignmentNumber}`);
        await codeReviewerAssignmentView.validateStatusBadgeText("In Revizuire");
        await codeReviewerAssignmentView.validateGithubUrl(githubUrl);
        await codeReviewerAssignmentView.validateGithubBranch(githubBranch);
        await codeReviewerAssignmentView.sendBackAssignment();
        await browser.pause(1000);
        await codeReviewerAssignmentView.validateStatusBadgeText("Necesită Modificări");
        await codeReviewerAssignmentView.goBack();

        await browser.pause(2000);
        await codeReviewerDashboard.validateNeedsUpdateAssignmentTitle(assignmentNumber, `Lucrarea #${assignmentNumber}`);
        await codeReviewerDashboard.validateNeedsUpdateAssignmentStatusBadge(assignmentNumber, "Necesită Modificări");
        await codeReviewerDashboard.validateNeedsUpdateAssignmentGithubUrl(assignmentNumber, githubUrl);
        await codeReviewerDashboard.validateNeedsUpdateAssignmentBranch(assignmentNumber, githubBranch);
        await codeReviewerDashboard.validateNeedsUpdateAssignmentStudentName(assignmentNumber, "Mihai Fratila");

        await navigationBar.logout();
        await loginPage.login(testdata.studentUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Depune o Temă");
        await homePage.navigateToDashboard();

        const updatedBranch = "updated_branch"

        await studentDashboardPage.validatePageTitle();
        await studentDashboardPage.validateAssignmentStatusBadge(assignmentNumber, "Necesită Modificări");
        await studentDashboardPage.editAssignment(assignmentNumber);
        await studentAssignmentViewPage.validateStatusBadgeText("Necesită Modificări");
        await studentAssignmentViewPage.fillGithubBranchInput(updatedBranch)
        await studentAssignmentViewPage.resubmitAssignment();
        await studentAssignmentViewPage.validateStatusBadgeText("Retrimis");
        await studentAssignmentViewPage.goBack();
        await browser.pause(1000);
        await studentDashboardPage.validateAssignmentStatusBadge(assignmentNumber, "Retrimis");

        await navigationBar.logout();
        await loginPage.login(testdata.codeReviewerUsername, testdata.password);
        await homePage.validateHomePageTitle();
        await homePage.validateNavigateButtonText("Mergi la Temele Depuse");
        await homePage.navigateToDashboard();

        await codeReviewerDashboard.validatePageTitle();
        await codeReviewerDashboard.validateAwaitingReviewAssignmentStatusBadge(assignmentNumber, "Retrimis");
        await codeReviewerDashboard.modifyAwaitingReviewAssignment(assignmentNumber);
        await browser.pause(2000);
        await codeReviewerDashboard.validateInReviewAssignmentTitle(assignmentNumber, `Lucrarea #${assignmentNumber}`);
        await codeReviewerDashboard.validateInReviewAssignmentStatusBadge(assignmentNumber, "In Revizuire");
        await codeReviewerDashboard.validateInReviewAssignmentGithubUrl(assignmentNumber, githubUrl);
        await codeReviewerDashboard.validateInReviewAssignmentBranch(assignmentNumber, updatedBranch);
        await codeReviewerDashboard.validateInReviewAssignmentStudentName(assignmentNumber, "Mihai Fratila");

    })
})

