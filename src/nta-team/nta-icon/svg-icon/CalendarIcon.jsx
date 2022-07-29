import React from 'react'
import { ReactComponent as CalendarSvg } from "assets/img/svg/calendar-icon.svg";

export default function CalendarIcon(props) {
  return (
    <CalendarSvg width={16} height={16} {...props}/>
  )
}
