import React from 'react'
import { ReactComponent as ResearchImageSvg } from "assets/img/svg/research-img.svg";

export default function ResearchImage(props) {
  return (
    <ResearchImageSvg width={16} height={16} {...props} />
  )
}
