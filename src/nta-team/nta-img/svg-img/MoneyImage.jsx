import React from 'react'
import { ReactComponent as MoneyImageSvg } from "assets/img/svg/money-img.svg";

export default function MoneyImage(props) {
  return (
    <MoneyImageSvg width={16} height={16} {...props} />
  )
}
