import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({...state, day});
  const setDays = days => setState( prev => ({... prev, days}));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({...state, appointments})
    })
    .catch(error => {
      console.log("!");
      console.log(error);
      throw error;
    });
    
    // const URL = `http://localhost:8001/api/appointments/${id}`;
    // return axios({URL, method: "PUT", data: appointment})
    // .then(() => {
    //   setState({...state, appointments})
    // })
    // .catch(error => {
    //   console.log("!");
    //   console.log(error);
    //   throw error;
    // });
    
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    // const URL = `http://localhost:8001/api/appointments/${id}`;
    // return axios({URL, method: "DELETE", data: appointment}).then(() => {
    //   setState({...state, appointments})
    // });

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments})
    })
    .catch(error => {
      console.log("!");
      console.log(error);
      throw error;
    });

  }

  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log(all[0].data, all[1].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));

    });
  }, [])

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    console.log(dailyInterviewers);
    return(
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />)
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
