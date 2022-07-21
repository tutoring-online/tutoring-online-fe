import React from 'react'
import { ReactComponent as VisaCardImageSvg } from "assets/img/svg/visa-card-img.svg";

export default function VisaCardImage(props) {
    return (
        <VisaCardImageSvg width={16} height={16} {...props} />
    )
}
