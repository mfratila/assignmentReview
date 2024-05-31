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
            await new Promise((resolve, reject) => {
                fs.createReadStream(fullPath)
                    .pipe(csv())
                    .on('data', (row) => {
                        const page = row['Page'];
                        const duration = row['Transition Duration (ms)'];
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
    
        return data;
    };

    async writeExcelFile(data, outputPath) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Performance Results');
    
        // Prepare header row with dynamic columns based on input data
        const headers = ['Page'];
        const maxColumns = Math.max(...Object.values(data).map(d => d.length));
        for (let i = 1; i <= maxColumns; i++) {
            headers.push(`Run ${i}`);
        }
        sheet.addRow(headers);
    
        // Add data rows
        for (const [page, durations] of Object.entries(data)) {
            const row = [page, ...durations];
            sheet.addRow(row);
        }
    
        await workbook.xlsx.writeFile(outputPath);
    };

    async processPerformanceData(directory, outputPath) {
        const data = await this.readCSVFiles(directory);
        await this.writeExcelFile(data, outputPath);
        console.log('Excel file has been created successfully.');
    };

}

export default new Actions();