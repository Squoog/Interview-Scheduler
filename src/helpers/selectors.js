export function getAppointmentsForDay(state, day) {
  const scheduleDay = state.days.find(elem => elem.name === day);

  if (state.days.length === 0 || ! scheduleDay) {
    return [];
  }

  const arr = scheduleDay.appointments.map( appointment => {
    return state.appointments[appointment];
  })

  return arr;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewer = Object.values(state.interviewers).find(elem => elem.id === interview.interviewer);

  return {
    "student": interview.student,
    "interviewer": interviewer
  };
}

export function getInterviewersForDay(state, day) {
  const scheduleDay = state.days.find(elem => elem.name === day);
  if (state.days.length === 0 || ! scheduleDay) {
    return [];
  };

  const arr = scheduleDay.appointments.map(appointment => {
    const interviewerID = state.appointments[appointment].interview?.interviewer
    return state.interviewers[interviewerID];
  });
  return arr;
}