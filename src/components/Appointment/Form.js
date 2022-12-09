import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  const submitForm = (event) => {
    event.preventDefault()
  }

  const validate = () => {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("please select an interviewer");
      return;
    }
  
    setError("");
    props.onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={submitForm}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            
            onChange={(event) => setStudent(event.target.value)}
            value={student}

            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
            <InterviewerList
              interviewers={props.interviewers}
              value={interviewer}
              onChange={(event) => setInterviewer(event)}
            />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {validate(student, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  )
}