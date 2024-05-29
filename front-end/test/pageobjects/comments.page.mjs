import { $ } from '@wdio/globals';
import actions from '../utils/actions.mjs';

class CommentsPage {

    get commentContainer() {
        return $('#comment-container');
    }

    get commentInput() {
        return $('#commentInput');
    }

    get submitCommentBtn() {
        return $('#submit-comment-btn');
    }

    getCommentByIndex(index) {
        return $(`#comment-${index}`);
    }

    getCommentPersonByIndex(index) {
        return $(`#comment-${index} > div > #comment-created-by`);
    }

    getEditCommentByIndex(index) {
        return $(`#comment-${index} > div > #edit-comment`);
    }

    getDeleteCommentByIndex(index) {
        return $(`#comment-${index} > div > #delete-comment`);
    }

    getCommentTextByIndex(index) {
        return $(`#comment-${index} > #comment-text`);
    }

    getCommentPostedTimeByIndex(index) {
        return $(`#comment-${index} > #posted-time`);
    }

    async enterNewComment(value) {
        await actions.selectElementAndEnterText(this.commentInput, value);
        await actions.clickElement(this.submitCommentBtn);
    }

    async editComment(index, value) {
        await actions.clickElement(this.getEditCommentByIndex(index));
        await actions.selectElementAndEnterText(this.commentInput, value);
        await actions.clickElement(this.submitCommentBtn);
    }

    async deleteComment(index) {
        await actions.clickElement(this.getDeleteCommentByIndex(index));
    }

    async validateCommmentText(index, value) {
        await actions.validateElementText(this.getCommentTextByIndex(index), value, "String do not match");
    }

    async validateCommentPersonName(index, value) {
        await actions.validateElementText(this.getCommentPersonByIndex(index), value);
    }

    async validateCommentPostedTime(index, value) {
        await actions.validateElementText(this.getCommentPostedTimeByIndex(index), value);
    }

}

export default new CommentsPage();