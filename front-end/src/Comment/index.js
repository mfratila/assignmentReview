import React, { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {
  const user = useUser();
  const decodedJwt = jwtDecode(user.jwt);

  const {
    id,
    commentId,
    createdDate,
    createdBy,
    text,
    emitDeleteComment,
    emitEditComment,
  } = props;
  const [commentRelativeTime, setCommentRelativeTime] = useState("");

  useEffect(() => {
    updateCommentRelativeTime();
  }, [createdDate]);

  function updateCommentRelativeTime() {
    if (createdDate) {
      dayjs.extend(relativeTime);
      
      if (typeof createdDate === "string")
      setCommentRelativeTime(dayjs(createdDate).fromNow());
      else {
        setCommentRelativeTime(createdDate.fromNow());
      }
    }
  }

  return (
    <>
      <div id={id} className="comment-bubble" key={id}>
        <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
          <div id="comment-created-by">{`${createdBy.name}: `}</div>
          {decodedJwt.sub === createdBy.username ? (
            <>
              <div id="edit-comment"
                onClick={() => emitEditComment(commentId)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                edit
              </div>
              <div id="delete-comment"
                onClick={() => emitDeleteComment(commentId)}
                style={{ cursor: "pointer", color: "red" }}
              >
                delete
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div id="comment-text">{text}</div>
        <div className="mt-2" id="posted-time"
        style={{ marginTop: "-0.9em", marginLeft: "1.4em", fontSize: "14px" }}
      >
        {commentRelativeTime ? `Posted ${commentRelativeTime}`: ""}
      </div>
      </div>

    </>
  );
};

export default Comment;
