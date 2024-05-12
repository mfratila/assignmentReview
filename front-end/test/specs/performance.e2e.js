/* eslint-disable no-undef */
const { browser, expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/home.page')
const fs = require('fs');
const path = require('path');

describe('My Login application', () => {
    before(async () => {
        await browser.enablePerformanceAudits({
            networkThrottling: 'online',
            cpuThrottling: 0,
            cacheEnabled: true
        });
    });
    
    it('should login with valid credentials and measure performance', async () => {
        await LoginPage.open();
        const loginMetrics = await browser.getMetrics();
        console.log('Login Page Metrics:', loginMetrics);

        await LoginPage.login('mihai.fratila01@gmail.com', '12345678');
        await expect(HomePage.welcomeText).toBeDisplayed();
        await expect(HomePage.platformDescriptionText).toBeDisplayed();

        const homeMetrics = await browser.getMetrics();
        console.log('Home Page Metrics:', homeMetrics);
        await browser.disablePerformanceAudits();

        const resultsDir = path.join(__dirname, '../test_performance_results');
        if (!fs.existsSync(resultsDir)){
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        const combinedMetrics = [
            ['Page', 'Time to First Byte (TTFB)', 'First Contentful Paint (FCP)', 'Speed Index', 'Total Blocking Time (TBT)', 'Largest Contentful Paint (LCP)'],
            ['Login Page', ...Object.values(loginMetrics)],
            ['Home Page', ...Object.values(homeMetrics)]
        ];

        const csvContent = combinedMetrics.map(e => e.join(',')).join('\n');
        const filePath = path.join(resultsDir, 'performance_metrics.csv');

        fs.writeFile(filePath, csvContent, err => {
            if (err) {
                console.error('Error writing to CSV file', err);
            } else {
                console.log('Successfully wrote performance data to CSV file:', filePath);
            }
        });
    });
});
