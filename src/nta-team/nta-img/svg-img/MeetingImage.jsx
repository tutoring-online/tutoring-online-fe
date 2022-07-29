import React from 'react'
import { ReactComponent as MeetingImageSvg } from "assets/img/svg/meeting-img.svg";

export default function MeetingImage(props) {
  return (
    <MeetingImageSvg width={16} height={16} {...props} />
  )
}
