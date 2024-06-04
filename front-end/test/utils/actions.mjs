import { browser } from '@wdio/globals'
import fs from 'fs';
import csv from 'csv-parser';
import ExcelJS from 'exceljs';

class Actions {

    async selectElementAndEnterText(element, text) {
        await element.scrollIntoView();
        await element.waitForDisplayed();
        await browser.pause(500);
        await element.setValue(text);
        await browser.pause(500);
    }

    async clickElement(element) {
        await element.scrollIntoView();
        await element.waitForDisplayed();
        await element.waitForClickable();
        await browser.pause(500);
        await element.click();
    }

    async validateElementText(element, expectedValue, errorMessage) {
        const actualValue = await element.getText();
        await expect(actualValue).toContain(expectedValue, errorMessage);
    }

    async validateElementValue(element, expectedValue, errorMessage) {
        const actualValue = await element.getValue();
        await expect(actualValue).toContain(expectedValue, errorMessage);
    }

    async getInitialTime() {
        const startTime = await browser.execute(() => {
            return new Date().getTime();
        });
        return startTime;
    }

    async calculateElapsedTime(startTime) {
        const currentTime = await browser.execute(() => {
            return new Date().getTime();
        });
        return (currentTime - startTime) / 1000;
    }

    async generateCsvFileFromMetrics(metrics, filePath) {
        let csvContent = metrics.map(e => e.join(',')).join('\n');

        // Write to CSV
        fs.writeFile(filePath, csvContent, err => {
            if (err) {
                console.error('Error writing to CSV file', err);
            } else {
                console.log('Successfully wrote performance data to CSV file:', filePath);
            }
        });
    }

    async readCSVFiles(directory) {
        const files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
        const data = {};

        for (const file of files) {
            const fullPath = `${directory}/${file}`;
            console.log(`Reading file: ${fullPath}`); // Debugging statement
            await new Promise((resolve, reject) => {
                fs.createReadStream(fullPath)
                    .pipe(csv())
                    .on('data', (row) => {
                        const page = row['Page'];
                        const duration = parseFloat(row['Transition Duration (ms)']);
                        if (!data[page]) {
                            data[page] = [];
                        }
                        data[page].push(duration);
                    })
                    .on('end', () => {
                        resolve();
                    })
                    .on('error', reject);
            });
        }

        console.log('Data read from CSV files:', data); // Debugging statement
        return data;
    }

    async writeExcelFile(data, outputPath) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Performance Results');

        // Prepare header row with pages as columns and an empty column before 'Average Duration'
        const pages = Object.keys(data);
        const headers = ['Run', ...pages, '', 'Page Name', 'Average Duration'];
        sheet.addRow(headers);

        // Find the maximum number of runs
        const maxRuns = Math.max(...Object.values(data).map(d => d.length));

        // Add data rows for each run
        for (let i = 0; i < maxRuns; i++) {
            const row = [`Run ${i + 1}`];
            for (const page of pages) {
                row.push(data[page][i] !== undefined ? data[page][i] : '');
            }
            row.push(''); // Add an empty cell before 'Page Name'
            sheet.addRow(row);
        }

        // Add the page names and average durations starting after the last run row
        const startRow = maxRuns + 2; // Leave one row empty after the last run row

        pages.forEach((page, index) => {
            const durations = data[page];
            const sum = durations.reduce((acc, val) => acc + val, 0);
            const avg = (sum / durations.length) || 0;
            const row = ['', ...Array(pages.length).fill(''), '', page, avg];
            sheet.getRow(startRow + index).values = row;
        });

        await workbook.xlsx.writeFile(outputPath);
        console.log(`Excel file written to ${outputPath}`); // Debugging statement
    }

    async processPerformanceData(directory, outputPath) {
        const data = await this.readCSVFiles(directory);
        await this.writeExcelFile(data, outputPath);
        console.log('Excel file has been created successfully.');
    };

}

export default new Actions();