import React from 'react'
import { ReactComponent as PaypalImageSvg } from "assets/img/svg/paypal-img.svg";

export default function PaypalImage(props) {
    return (
        <PaypalImageSvg width={16} height={16} {...props} />
    )
}
