import React from 'react'
import TextDanger from './TextDanger'

export default function RequiredLabel({
    label
}) {
    return (
        <span>
            {`${label} `}
            <TextDanger>*</TextDanger>
        </span>
    )
}
