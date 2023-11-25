import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
  });

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentData) => {
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        if (assignmentData.branch === null) assignmentData.branch = "";
        setAssignment(assignmentData);
      }
    );
  }, []);

  return (
    <div>
      <h1>Assignment {assignmentId}</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h3>
            GitHub URL:{" "}
            <input
              type="url"
              id="gitHubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignment.githubUrl}
            />
          </h3>
          <h3>
            Branch:{" "}
            <input
              type="text"
              id="gitHubBranch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
            />
          </h3>
          <button onClick={() => save()}>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;
