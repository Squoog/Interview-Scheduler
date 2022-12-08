import React, {useEffect} from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode (
    props.interview ? SHOW : EMPTY
  )
  useEffect(() => {
    console.log(mode);
  }, [mode]);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  };

  const deleteInterview = () => {
    transition(DELETING);

    props
      .cancelInterview (props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => console.log(error));
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)} />
      )}

      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}

      {mode === SAVING && <Status message="Saving..."/>}

      {mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={back} message="Are you sure you would like to delete?"/>}

      {mode === DELETING && <Status message="Deleting..."/>}
    </article>
  );
}