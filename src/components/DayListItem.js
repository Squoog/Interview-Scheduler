import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const itemClass = classNames("day-list__item", {
    "day-list__item--selected" : false,
    "day-list__item--full" : false
  })

  const { name, spots, selected, setDay} = { ...props };

  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    else {
      return `${spots} spots remaining`;
    }
  }

  const remainingSpots = formatSpots(spots);
  
  return (
    <li onClick = {() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{remainingSpots}</h3>
    </li>
  );
}