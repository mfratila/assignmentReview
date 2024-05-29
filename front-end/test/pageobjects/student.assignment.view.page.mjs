import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class StudentAssignmentViewPage {

    get assignmentNumberDropdown() {
        return $('#assignment-number-dropdown');
    }

    getAssignmentNumberSelection(number) {
        return $(`#assignment-number-${number}`);
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

    get submitAssignmentBtn() {
        return $('#submit-btn');
    }

    get resubmitAssignmentBtn() {
        return $('#resend-btn');
    }

    get backBtn() {
        return $('#back-btn');
    }

    async selectAssignmentNumber(number) {
        await actions.clickElement(this.assignmentNumberDropdown);
        await actions.clickElement(this.getAssignmentNumberSelection(number));
    }

    async validateStatusBadgeText(text) {
        await actions.selectElementAndEnterText(this.statusBadge, text);
    }

    async fillGithubUrlInput(text) {
        await actions.selectElementAndEnterText(this.gihubUrlInput, text);
    }

    async fillGithubBranchInput(text) {
        await actions.selectElementAndEnterText(this.githubBranchInput, text);
    }

    async submitNewAssignment() {
        await actions.clickElement(this.submitAssignmentBtn);
    }

    async resubmitAssignment() {
        await actions.clickElement(this.resubmitAssignmentBtn);
    }

    async goBack() {
        await actions.clickElement(this.backBtn);
    }

    async fillAssignment(assignmentNumber, githubUrl, branch) {
        await this.selectAssignmentNumber(assignmentNumber);
        await this.fillGithubUrlInput(githubUrl);
        await this.fillGithubBranchInput(branch);
        await this.submitNewAssignment();
    }

}

export default new StudentAssignmentViewPage();