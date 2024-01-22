import React from "react";
import { useUser } from "../UserProvider";
import { jwtDecode } from "jwt-decode";

const Comment = (props) => {
  const user = useUser();
  const decodedJwt = jwtDecode(user.jwt);
  console.log(decodedJwt.sub);

  const { id, createdDate, createdBy, text, emitDeleteComment, emitEditComment } = props;
  console.log(createdBy);
  return (
    <div className="comment-bubble" key={id}>
      <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
      <div>{`${createdBy.name}: `}</div>
      {
        decodedJwt.sub === createdBy.username ? (
          <>
          <div onClick={() => emitEditComment(id)} style={{ cursor: "pointer", color: "blue"}}>edit</div>
          <div onClick={() => emitDeleteComment(id)} style={{ cursor: "pointer", color: "red"}}>delete</div>
          </>
        ) : <></>
      }
      </div>
      <div>{text}</div>
    </div>
  );
};

export default Comment;
