import loginPage from '../../pageobjects/login.page.mjs';
import homePage from '../../pageobjects/home.page.mjs';
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


const iterationNumber = 5;


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
            // Start timing before opening the login page
            await loginPage.validatePageElementsAreVisible();
            await loginPage.login(testdata.studentUsername, testdata.password);
            const homePageStartTime = await actions.getInitialTime();

            await homePage.validateHomePageTitle();
            const homePageElapsedTime = await actions.calculateElapsedTime(homePageStartTime);

            const logoutStartTime = await actions.getInitialTime();
            await navigationBar.logout();
            const logoutElapsedTime = await actions.calculateElapsedTime(logoutStartTime);

            // Prepare CSV content
            let combinedMetrics = [
                ['Page', 'Transition Duration (ms)'],
                ['Home Page', homePageElapsedTime],
                ['Login Page', logoutElapsedTime]
            ];

            await actions.generateCsvFileFromMetrics(combinedMetrics, filePath)
        });
    }

    await actions.processPerformanceData(join(__dirname, "./test_performance_results"), "./PerformanceSummary.xlsx");
});
