import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class CodeReviewerAssignmmentViewPage {

    get pageTitle() {
        return $('#assignment-title');
    }

    get statusBadge() {
        return $('#status-badge');
    }

    get gihubUrlInput() {
        return $('#githubUrl-input');
    }

    get githubBranchInput() {
        return $('#gitHubBranch-input');
    }

    get videoReviewUrlInput() {
        return $('#reviewVideoUrl-input');
    }

    get completeReviewBtn() {
        return $('#complete-review-btn');
    }

    get sendBackAssignmentBtn() {
        return $('#decline-assignment-btn');
    }
    
    get reviewAgainBtn() {
        return $('#take-review-again-btn');
    }

    get backBtn() {
        return $('#back-btn');
    }

    async validatePageTitle(value) {
        await this.pageTitle.waitForDisplayed();
        await actions.validateElementText(this.pageTitle, value);
    }

    async validateStatusBadgeText(value) {
        await browser.pause(2000);
        await actions.validateElementText(this.statusBadge, value);
    }

    async validateGithubUrl(value) {
        await actions.validateElementValue(this.gihubUrlInput, value);
    }

    async validateGithubBranch(value) {
        await actions.validateElementValue(this.githubBranchInput, value);
    }

    async fillReviewVideoUrlInput(value) {
        await actions.selectElementAndEnterText(this.videoReviewUrlInput, value);
    }

    async completeReview() {
        await actions.clickElement(this.completeReviewBtn);
    }

    async sendBackAssignment() {
        await actions.clickElement(this.sendBackAssignmentBtn);
    }

    async goBack() {
        await actions.clickElement(this.backBtn);
    }

    async retakeAssignment() {
        await actions.clickElement(this.reviewAgainBtn);
    }



}

export default new CodeReviewerAssignmmentViewPage();