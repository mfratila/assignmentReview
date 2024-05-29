import { $, browser } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class StudentDashboardPage {

get pageTitle() {
    return $('#page-title')
}

get createNewAssignmentBtn() {
    return $('#createAssignmentBtn');
}

getAssignmentByNumber(number) {
    return $(`#studentAssignmentCard-${number}`);
}

getAssignmmentTitleByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #card-title`);
}

getAssignmmentSubtitleByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #card-subtitle`);
}

getAssignmentStatusBadgeByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > div > #status-badge`);
}

getAssignmentDescriptionByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #assignment-desc`);
}

getAssignmnentGithubUrlByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #github-url-text`);
}

getAssignmnentGithubBranchByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #branch-text`);
}

getEditAssignmentBtnByNumber(number) {
    return $(`#studentAssignmentCard-${number} > div > #navigate-to-assignment-btn`);
}

async validatePageTitle() {
    await expect(this.pageTitle).toBeDisplayed();
    await actions.validateElementText(this.pageTitle, "Tabel de Bord Student", "strings to not match");
}

async validateAssignmentTitle(number, text) {
    await actions.validateElementText(this.getAssignmmentTitleByNumber(number), text);
}

async validateAssignmentSubtitle(number, text) {
    await actions.validateElementText(this.getAssignmmentSubtitleByNumber(number), text);
}

async validateAssignmentStatusBadge(number, text) {
    await actions.validateElementText(this.getAssignmentStatusBadgeByNumber(number), text);
}

async validateAssignmentDescription(number, text) {
    await actions.validateElementText(this.getAssignmentDescriptionByNumber(number), text);
}

async validateAssignmentGithubUrl(number, text) {
    await actions.validateElementText(this.getAssignmnentGithubUrlByNumber(number), text);
}

async validateAssignmentBranch(number, text) {
    await actions.validateElementText(this.getAssignmnentGithubBranchByNumber(number), text);
}

async editAssignment(number) {
    await actions.clickElement(this.getEditAssignmentBtnByNumber(number));
}

}

export default new StudentDashboardPage();