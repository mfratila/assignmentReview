import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class CodeReviewerDashboardPage {

    get pageTitle() {
        return $('#page-title')
    }

    getInReviewAssignmentByNumber(number) {
        return $(`#in-review-assignment-card-${number}`);
    }

    getAwaitingReviewAssignmentByNumber(number) {
        return $(`#sent-assignment-card-${number}`);
    }

    getInReviewAssignmentByNumber(number) {
        return $(`#needs-update-assignment-card-${number}`);
    }

    getInReviewAssignmentTitleByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > #card-title`);
    }

    getInReviewAssignmentStatusBadgeByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > div > #status-badge`);
    }

    getInReviewGithubUrlByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > #github-url-text`);
    }

    getInReviewGithubBranchByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > #github-branch-text`);
    }

    getInReviewStudentNameByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > #student-name-text`);
    }

    getInReviewModifyBtnByNumer(number) {
        return $(`#in-review-assignment-card-${number} > div > #modify-assignment-btn`);
    }

    getAwaitingReviewAssignmentTitleByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > #card-title`);
    }

    getAwaitingReviewAssignmentStatusBadgeByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > div > #status-badge`);
    }

    getAwaitingReviewGithubUrlByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > #github-url-text`);
    }

    getAwaitingReviewGithubBranchByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > #github-branch-text`);
    }

    getAwaitingReviewStudentNameByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > #student-name-text`);
    }

    getAwaitingReviewModifyBtnByNumer(number) {
        return $(`#sent-assignment-card-${number} > div > #modify-assignment-btn`);
    }

    getNeedsUpdateAssignmentTitleByNumer(number) {
        return $(`#needs-update-assignment-card-${number} > div > #card-title`);
    }

    getNeedsUpdateAssignmentStatusBadgeByNumer(number) {
        return $(`#needs-update-assignment-card-${number} > div > div > #status-badge`);
    }

    getNeedsUpdateGithubUrlByNumer(number) {
        return $(`#needs-update-assignment-card-${number} > div > #github-url-text`);
    }

    getNeedsUpdateGithubBranchByNumer(number) {
        return $(`#needs-update-assignment-card-${number} > div > #github-branch-text`);
    }

    getNeedsUpdateStudentNameByNumer(number) {
        return $(`#needs-update-assignment-card-${number} > div > #student-name-text`);
    }

    getNeedsUpdateModifyBtnByNumer(number) {
        return $(`#needs-update-card-${number} > div > #modify-assignment-btn`);
    }

    async validatePageTitle() {
        await this.pageTitle.waitForDisplayed();
        await actions.validateElementText(this.pageTitle, "Tabel de Bord Revizuitor Cod");
    }

    async validateInReviewAssignmentTitle(number, text) {
        await actions.validateElementText(this.getInReviewAssignmentTitleByNumer(number), text);
    }

    async validateAwaitingReviewAssignmentTitle(number, text) {
        await actions.validateElementText(this.getAwaitingReviewAssignmentTitleByNumer(number), text);
    }

    async validateNeedsUpdateAssignmentTitle(number, text) {
        await actions.validateElementText(this.getNeedsUpdateAssignmentTitleByNumer(number), text);
    }

    async validateInReviewAssignmentStatusBadge(number, text) {
        await actions.validateElementText(this.getInReviewAssignmentStatusBadgeByNumer(number), text);
    }

    async validateAwaitingReviewAssignmentStatusBadge(number, text) {
        await actions.validateElementText(this.getAwaitingReviewAssignmentStatusBadgeByNumer(number), text);
    }

    async validateNeedsUpdateReviewAssignmentStatusBadge(number, text) {
        await actions.validateElementText(this.getNeedsUpdateAssignmentStatusBadgeByNumer(number), text);
    }

    async validateInReviewAssignmentGithubUrl(number, value) {
        await actions.validateElementText(this.getInReviewGithubUrlByNumer(number), value);
    }

    async validateInReviewAssignmentGithubUrl(number, value) {
        await actions.validateElementText(this.getAwaitingReviewGithubUrlByNumer(number), value);
    }

    async validateInReviewAssignmentGithubUrl(number, value) {
        await actions.validateElementText(this.getNeedsUpdateGithubUrlByNumer(number), value);
    }

    async validateInReviewAssignmentBranch(number, value) {
        await actions.validateElementText(this.getInReviewGithubBranchByNumer(number), value);
    }

    async validateInReviewAssignmentBranch(number, value) {
        await actions.validateElementText(this.getAwaitingReviewGithubBranchByNumer(number), value);
    }

    async validateInReviewAssignmentBranch(number, value) {
        await actions.validateElementText(this.getNeedsUpdateGithubBranchByNumer(number), value);
    }

    async validateInReviewAssignmentStudentName(number, value) {
        await actions.validateElementText(this.getInReviewStudentNameByNumer(number), value);
    }

    async validateInReviewAssignmentStudentName(number, value) {
        await actions.validateElementText(this.getAwaitingReviewStudentNameByNumer(number), value);
    }

    async validateInReviewAssignmentStudentName(number, value) {
        await actions.validateElementText(this.getNeedsUpdateStudentNameByNumer(number), value);
    }

    async modifyInReviewAssignmment(number) {
        await actions.clickElement(this.getInReviewModifyBtnByNumer(number));
    }

    async modifyNeedsUpdateAssignment(number) {
        await actions.clickElement(this.getNeedsUpdateModifyBtnByNumer(number));
    }

    async modifyAwaitingReviewAssignment(number) {
        await actions.clickElement(this.getAwaitingReviewModifyBtnByNumer(number));
    }

}

export default new CodeReviewerDashboardPage();