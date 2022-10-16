import React from 'react'
import { ReactComponent as LogoImageSvg } from "assets/img/svg/LOGO_LIGHTBLUE_221015.svg";

export default function LogoImage(props) {
    return (
        <LogoImageSvg width={16} height={16} {...props} />
    )
}
