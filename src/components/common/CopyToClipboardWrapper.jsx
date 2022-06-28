import { Box } from '@mui/system';
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BootstrapTooltip from 'nta-team/nta-tooltips/BootstrapTooltip';

export default function CopyToClipboardWrapper({
    text = null,
    children
}) {
    const [copiedText, setCopiedText] = useState("");

    return (
        <CopyToClipboard
            text={text}
            onCopy={() => setCopiedText(text)}
        >
            <BootstrapTooltip
                title={
                    copiedText === text
                        ? "This was Copied!"
                        : "Copy To Clipboard"
                }
                placement="top"
            >
                <Box
                    component="div"
                    width="100%"
                    position="relative"
                    sx={{ cursor: "pointer" }}
                >
                    <>{children}</>
                    <Box
                        position="absolute"
                        right="-1rem"
                        top="50%"
                        sx={{ transform: "translateY(-50%)" }}
                    >
                        <ContentCopyIcon fontSize='medium' />
                    </Box>
                </Box>
            </BootstrapTooltip>
        </CopyToClipboard>
    )
}
