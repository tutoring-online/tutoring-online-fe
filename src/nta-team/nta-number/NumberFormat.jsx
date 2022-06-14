import React from "react";
import ReactNumberFormat from 'react-number-format';

const NumberFormat = React.forwardRef(function (props, ref) {
    const { onChange, prefix, ...other } = props;

    return (
        <ReactNumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            prefix={prefix || "$"}
        />
    );
});

export default NumberFormat;