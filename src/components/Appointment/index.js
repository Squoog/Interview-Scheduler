import React, {useEffect} from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {transition(ERROR_SAVE, true)});
  };

  const destroy = () => {
    transition(DELETING, true);

    props
      .cancelInterview (props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={()=> transition(EDIT)} />
      )}

      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)} onSave={save}/>)}

      {mode === SAVING && <Status message="Saving..."/>}

      {mode === CONFIRM && (
      <Confirm
        onConfirm={destroy}
        onCancel={back}
        message="Are you sure you would like to delete?"/>)}

      {mode === DELETING && <Status message="Deleting..."/>}

      {mode === EDIT && (
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}

      {mode === ERROR_SAVE && <Error onClose={back} />}

      {mode === ERROR_DELETE && (
      <Error
        message="Could not cancel the appointment"
        onClose={back}
      />
      )}
    </article>
  );
}