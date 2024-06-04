import loginPage from '../../pageobjects/login.page.mjs';
import homePage from '../../pageobjects/home.page.mjs';
import studentDashboard from '../../pageobjects/student.dashboard.page.mjs';
import codeReviewerDashboard from '../../pageobjects/code.reviewer.dashboard.page.mjs';
import adminDashboard from '../../pageobjects/admin.dashboad.page.mjs';
import actions from '../../utils/actions.mjs';
import navigationBar from '../../pageobjects/navbar.page.mjs';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import testdata from '../../utils/testdata.json' with { type: "json" }

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resultsDir = join(__dirname, './test_performance_results');
if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
}


const iterationNumber = 20;


describe('My Login application', async () => {
    before(async () => {
        await loginPage.open();
    })
    for (let i = 1; i <= iterationNumber; i++) {

        const csvFileName = `performance_metrics_${i}.csv`;
        const filePath = join(resultsDir, csvFileName);
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        it('should login with valid credentials and measure performance on each page', async function () {
            await loginPage.validatePageElementsAreVisible();
            await loginPage.login(testdata.studentUsername, testdata.password);
            const homePageStartTime = await actions.getInitialTime();

            await homePage.validateHomePageTitle();
            await homePage.validateNavigateButtonText("Depune o Temă");
            const homePageElapsedTime = await actions.calculateElapsedTime(homePageStartTime);

            const studentDashboardStartTime = await actions.getInitialTime();
            await homePage.navigateToDashboard();
            await studentDashboard.validatePageTitle();
            const studentDashboardElapsedTime = await actions.calculateElapsedTime(studentDashboardStartTime);

            await navigationBar.logout();

            await loginPage.validatePageElementsAreVisible();
            await loginPage.login(testdata.codeReviewerUsername, testdata.password);
            await homePage.validateHomePageTitle();
            await homePage.validateNavigateButtonText("Mergi la Temele Depuse");

            const codeReviewerDashboardInitialTime = await actions.getInitialTime();
            await homePage.navigateToDashboard();
            await codeReviewerDashboard.validatePageTitle();
            const codeReviewerDashboardElapsedTime = await actions.calculateElapsedTime(codeReviewerDashboardInitialTime);

            await navigationBar.logout();

            await loginPage.validatePageElementsAreVisible();
            await loginPage.login(testdata.administratorUsername, testdata.password);
            await homePage.validateHomePageTitle();
            await homePage.validateNavigateButtonText("Mergi la Tabelul de Bord cu Utilizatori");

            const adminDashboardInitialTime = await actions.getInitialTime();
            await homePage.navigateToDashboard();
            await adminDashboard.validatePageTitle();
            const adminDashboardElapsedTime = await actions.calculateElapsedTime(adminDashboardInitialTime);

            const logoutStartTime = await actions.getInitialTime();
            await navigationBar.logout();
            const logoutElapsedTime = await actions.calculateElapsedTime(logoutStartTime);

            // Prepare CSV content
            let combinedMetrics = [
                ['Page', 'Transition Duration (ms)'],
                ['Home Page', homePageElapsedTime],
                ['Student Dashboard', studentDashboardElapsedTime],
                ['Code Reviewer Dashboard', codeReviewerDashboardElapsedTime],
                ['Admin Dashboard', adminDashboardElapsedTime],
                ['Login Page', logoutElapsedTime],
            ];

            await actions.generateCsvFileFromMetrics(combinedMetrics, filePath)
        });
    }

    after(async () => {
        await actions.processPerformanceData(join(__dirname, "./test_performance_results"), "./PerformanceSummary.xlsx");
    })
});
