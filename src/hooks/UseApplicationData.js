import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}