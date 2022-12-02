import React from "react";

export default function DayListItem(props) {
  const def = "";
  const regular = "text--regular";
  const light = "text--light";
  return (
    <li onClick = {() => props.setDay(props.name)}>
      <h2 className="text==regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remain</h3>
    </li>
  );
}