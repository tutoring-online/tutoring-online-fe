import React from 'react'
import { ReactComponent as NewSvg } from "assets/img/svg/new-icon.svg";

export default function NewIcon(props) {
    return (
        <NewSvg width={16} height={16} {...props} />
    )
}
