import React from 'react'
import { ReactComponent as CalendarImageSvg } from "assets/img/svg/calendar-img.svg";

export default function CalendarImage(props) {
  return (
    <CalendarImageSvg width={16} height={16} {...props} />
  )
}
