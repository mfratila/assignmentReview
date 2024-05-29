import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class CourseListPage {

    get pageTitle() {
        return $('#page-title')
    }

    getCourseCardByIndex(index) {
        return $(`#course-card-${index}`);
    }

    getCourseTitleByIndex() {
        return $(`#course-card-${index} > div > #card-title`)
    }

    getCourseSubtitleByIndex() {
        return $(`#course-card-${index} > div > #card-subtitle`)
    }

    getCourseDescriptionByIndex() {
        return $(`#course-card-${index} > div > #card-text`);
    }

    getNavigateToCourseBtnByIndex(index) {
        return $(`#course-card-${index} > div > #navigate-to-course-btn`);
    }

    async validatePageTitle() {
        await this.pageTitle.waitForDisplayed();
        await actions.validateElementText(this.pageTitle, "Listă Materiale Didactice");
    }

    async validateCourseTitle(index, value) {
        await actions.validateElementText(this.getCourseTitleByIndex(index), value);
    }

    async validateCourseSubtitle(index, value) {
        await actions.validateElementText(this.getCourseSubtitleByIndex(index), value);
    }

    async validateCourseDescription(index, value) {
        await actions.validateElementText(this.getCourseDescriptionByIndex(index), value);
    }

    async navigateToCourse(index) {
        await actions.clickElement(this.getNavigateToCourseBtnByIndex(index));
    }

}

export default new CourseListPage();