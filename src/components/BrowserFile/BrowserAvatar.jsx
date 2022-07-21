import React, { useRef } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import "./index.scss";

export default function BrowserAvatar({
    text = "Upload avatar",
    onChange = () => { },
    extensions,
    ...props
}) {
    const inputFileElement = useRef(null);

    const handleOnBrowserFile = () => {
        inputFileElement?.current?.click();
    }

    const handleOnChange = (event) => {
        if (!event) return;
        onChange(event?.target?.files);
    }

    const getAcceptListString = () => {
        return extensions && extensions.join(", ");
    }

    return (
        <div
            className="browser-avatar"
            onClick={handleOnBrowserFile}
            {...props}
        >
            <input
                type="file"
                ref={inputFileElement}
                onChangeCapture={handleOnChange}
                accept={getAcceptListString() || "*"}
                style={{
                    display: "none"
                }}
            />

            <CloudUploadIcon
                className="browser-avatar__cloud-icon"
                fontSize='large'
            />
            
            <div className="browser-avatar__guide-text">
                {text}
            </div>
        </div>
    )
}