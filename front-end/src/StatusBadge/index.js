import React from "react";
import { Badge } from "react-bootstrap";

const StatusBadge = (props) => {
  const { text } = props;

  function getBadgeColor() {
    if (text === "Completat") return "success";
    else if (text === "Necesită Modificări") return "danger";
    else if (text === "Pending Submission") return "warning";
    else if (text === "În așteptarea trimiterii") return "primary";
    else return "info";
  }
  return (
    <Badge id="status-badge" pill bg={getBadgeColor()} style={{ fontSize: "1em" }}>
      {text}
    </Badge>
  );
};

export default StatusBadge;
