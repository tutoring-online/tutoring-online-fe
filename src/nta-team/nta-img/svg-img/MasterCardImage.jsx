import React from 'react'
import { ReactComponent as MasterCardImageSvg } from "assets/img/svg/mastercard-img.svg";

export default function MasterCardImage(props) {
    return (
        <MasterCardImageSvg width={16} height={16} {...props} />
    )
}
