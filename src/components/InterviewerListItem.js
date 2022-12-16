import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const {selected, setInterviewer} = {...props};
  const interviewerClass = classNames("Interviewers__item", {
    "interviewers__item--selected" : selected
  })
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}