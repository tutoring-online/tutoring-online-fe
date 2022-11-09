import React, { useEffect } from 'react'
import { useState } from 'react';

const DEFAULT_TIME_DELAY = 500; //ms
export const DELAY_RENDER_DIRECTION = {
    render: "render",
    stopRender: "stopRender",
    all: "all"
}

function DelayRenderWrapper({
    isRender,
    delay = DEFAULT_TIME_DELAY,
    direction,
    children,
    ...props
}) {

    const [delayIsRender, setDelayIsRender] = useState(isRender || DEFAULT_TIME_DELAY)

    useEffect(() => {
        let timer = null;
        const _delay = delay ?? DEFAULT_TIME_DELAY;
        const _direction = direction;

        (() => {
            if (isRender) {
                if (_direction === DELAY_RENDER_DIRECTION.all || _direction === DELAY_RENDER_DIRECTION.render) {
                    timer = setTimeout(() => {
                        setDelayIsRender(true)
                    }, _delay)
                    return;
                }
                setDelayIsRender(true);
                return;
            }

            if (!isRender) {
                if (_direction === DELAY_RENDER_DIRECTION.all || _direction === DELAY_RENDER_DIRECTION.stopRender) {
                    timer = setTimeout(() => {
                        setDelayIsRender(false)
                    }, _delay)
                    return;
                }
                setDelayIsRender(false);
                return;
            }
        })()

        return () => timer && clearTimeout(timer);
    }, [delay, direction, isRender])

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
        }
        return child;
    });

    return delayIsRender ? childrenWithProps : null;
}

export default DelayRenderWrapper;