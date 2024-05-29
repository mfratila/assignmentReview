import React, { useEffect, useRef, useState } from "react";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";
import { Button } from "react-bootstrap";
import Comment from "../Comment";
import { useInterval } from "../util/useInterval.js";
import dayjs from "dayjs";

const CommentContainer = (props) => {
  const { assignmentId, id } = props;
  const user = useUser();
  const commentInputRef = useRef(null);

  const emptyComment = {
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  };
  const [comment, setComment] = useState(emptyComment);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useInterval(() => {
    updateCommentTimeDisplay();
  }, 1000 * 5);

  function updateCommentTimeDisplay() {
    const commentsCopy = [...comments];
    commentsCopy.forEach(
      (comment) => (comment.createdDate = dayjs(comment.createdDate))
    );
    formatComments(commentsCopy);
  }

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    if (comment.text.trim() === "") {
      setErrorMessage("Comment text cannot be empty.");
      return;
    }
    setErrorMessage(""); // Clear error message on valid input

    if (comment.id) {
      ajax(`/api/comments/${comment.id}`, "put", user.jwt, comment).then(
        (commentData) => {
          const commentsCopy = [...comments];
          const i = commentsCopy.findIndex(
            (comment) => comment.id === commentData.id
          );
          commentsCopy[i] = commentData;
          formatComments(commentsCopy);
          setComment(emptyComment);
        }
      );
    } else {
      ajax("/api/comments", "post", user.jwt, comment).then((commentData) => {
        const commentsCopy = [...comments];
        commentsCopy.push(commentData);

        formatComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  function handleEditComment(commentId) {
    const i = comments.findIndex((comment) => comment.id === commentId);
    if (comments[i].text.trim() === "") {
      setErrorMessage("Textul comentariului nu poate fi gol!");
      return;
    }

    const commentCopy = {
      id: comments[i].id,
      text: comments[i].text,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
      createdDate: comments[i].createdDate,
    };
    setComment(commentCopy);
    setErrorMessage(""); // Clear error message on valid input

    if (commentInputRef.current) {
      commentInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleDeleteComment(commentId) {
    ajax(`/api/comments/${commentId}`, "delete", user.jwt).then((msg) => {
      const commentsCopy = [...comments];
      const i = commentsCopy.findIndex((comment) => comment.id === commentId);
      commentsCopy.splice(i, 1);
      formatComments(commentsCopy);
    });
  }

  function formatComments(commentsCopy) {
    commentsCopy.forEach((comment) => {
      if (typeof comment.createdDate === "string") {
        comment.createdDate = dayjs(comment.createdDate);
      }
    });
    setComments(commentsCopy);
  }

  useEffect(() => {
    ajax(
      `/api/comments?assignmentId=${assignmentId}`,
      "get",
      user.jwt,
      null
    ).then((commentsData) => {
      formatComments(commentsData);
    });
  }, []);

  return (
    <>
      <div id={id} className="mt-4">
        <textarea
          ref={commentInputRef}
          id="commentInput"
          style={{ width: "100%", borderRadius: "0.25em" }}
          onChange={(e) => updateComment(e.target.value)}
          value={comment.text}
        ></textarea>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <Button id="submit-comment-btn" onClick={() => submitComment()}>Adaugă Comentariu</Button>
      </div>
      <div className="mt-5">
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            id={`comment-${index}`}
            commentId={comment.id}
            createdDate={comment.createdDate}
            createdBy={comment.createdBy}
            text={comment.text}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
