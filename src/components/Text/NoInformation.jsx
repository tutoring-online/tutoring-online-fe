

import React from 'react'
import TextDanger from './TextDanger'



export default function NoInformation({
    text,
    ...props
}) {
    return (
        <TextDanger {...props}>
            {text || "No information"}
        </TextDanger>
    )
}
