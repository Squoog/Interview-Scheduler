import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const itemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots===0)
  })

  const { name, spots, selected, setDay} = { ...props };
  
  const clickHandler = () => (setDay(name));

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
    <li
      data-testid="day"
      className={itemClass}
      selected={selected}
      onClick={clickHandler} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{remainingSpots}</h3>
    </li>
  );
}