import { $, $$ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class CourseViewPage {

    get courseTitle() {
        return $('#course-title')
    }

    get courseDescription() {
        return $('#course-desc')
    }

    get courseContent() {
        return $('#course-content');
    }

    get stepsList() {
        return $$('ul > li');
    }

    getStepByIndex(index) {
        return $(`course-step-${index}`);
    }

    get goBackBtn() {
        return $('#back-btn');
    }

    get nextCourseBtn() {
        return $('#next-course-btn');
    }

    async validateCourseTitle(value) {
        await this.courseTitle.waitForDisplayed();
        await actions.validateElementText(this.courseTitle, value);
    }

    async validateCourseDescription(value) {
        await actions.validateElementText(this.courseDescription, value);
    }

    async validateCourseContent(value) {
        await actions.validateElementText(this.courseContent, value);
    }

    async validateCourseSteps(values) {
        const stepsSize = await this.stepsList.length;
        for (let i = 0; i < stepsSize; i++) {
            await actions.validateElementText(this.stepsList[i], values[i]);
        }
    }

    async goBack() {
        await actions.clickElement(this.goBackBtn);
    }

    async navigateToNextCourse() {
        await actions.clickElement(this.nextCourseBtn);
    }

}

export default new CourseViewPage();