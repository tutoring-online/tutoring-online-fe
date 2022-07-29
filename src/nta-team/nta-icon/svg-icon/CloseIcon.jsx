import React from 'react'
import { ReactComponent as CloseSvg } from "assets/img/svg/close-icon.svg";

export default function CloseIcon(props) {
    return (
        <CloseSvg width={16} height={16} {...props} />
    )
}
