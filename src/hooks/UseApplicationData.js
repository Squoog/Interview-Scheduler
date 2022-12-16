import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  // Updates spots remaining after a booked or cancelled appointment
  const updateSpots = (appointments) => {
    const currentDay = state.days.find((d) => d.name === state.day)
    const currentDayIndex = state.days.findIndex((d) => d.name === state.day)
    const spots = currentDay.appointments.filter((appointmentID) => appointments[appointmentID].interview === null).length
    const updatedDays = [...state.days]
    updatedDays[currentDayIndex] = {...currentDay, spots}
    return updatedDays
  }

  // Adds an interview, adds it to the display and updates spots remaining
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
      setState({...state, appointments, days: updateSpots(appointments)})
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
    
  };

  // Cancels an interview, removes it from the display and updates spots remaining
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
      setState({...state, appointments, days: updateSpots(appointments)})
    })
    .catch(error => {
      console.log(error);
      throw error;
    });

  }

  useEffect(()=>{
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
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