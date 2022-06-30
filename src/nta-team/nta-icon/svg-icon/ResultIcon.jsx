import React from 'react'
import { ReactComponent as ResultSvg } from "assets/img/svg/result-icon.svg";

export default function ResultIcon(props) {
    return (
        <ResultSvg width={16} height={16} {...props} />
    )
}
