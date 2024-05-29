/* eslint-disable no-undef */
import { browser } from '@wdio/globals';
import loginPage from '../../pageobjects/login.page.mjs';
import homePage from '../../pageobjects/home.page.mjs';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import testdata from '../../utils/testdata.json'  with { type: "json" }

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('My Login application', () => {
    before(async () => {
        await browser.enablePerformanceAudits({
            networkThrottling: 'online',
            cpuThrottling: 0,
            cacheEnabled: true
        });
    });
    
    it('should login with valid credentials and measure performance', async () => {
        await loginPage.open();
        const loginMetrics = await browser.getMetrics();
        console.log('Login Page Metrics:', loginMetrics);

        await loginPage.login(testdata.studentUsername, testdata.password);
        await homePage.validateHomePageTitle();

        const homeMetrics = await browser.getMetrics();
        console.log('Home Page Metrics:', homeMetrics);

        await browser.disablePerformanceAudits();

        const resultsDir = join(__dirname, '../../test_performance_results');
        if (!existsSync(resultsDir)){
            mkdirSync(resultsDir, { recursive: true });
        }

        const combinedMetrics = [
            ['Page', 'Time to First Byte (TTFB)', 'First Contentful Paint (FCP)', 'Speed Index', 'Total Blocking Time (TBT)', 'Largest Contentful Paint (LCP)'],
            ['Login Page', ...Object.values(loginMetrics)],
            ['Home Page', ...Object.values(homeMetrics)]
        ];

        const csvContent = combinedMetrics.map(e => e.join(',')).join('\n');
        const filePath = join(resultsDir, 'performance_metrics.csv');

        writeFile(filePath, csvContent, err => {
            if (err) {
                console.error('Error writing to CSV file', err);
            } else {
                console.log('Successfully wrote performance data to CSV file:', filePath);
            }
        });
    });
});
