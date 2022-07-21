import { Box, IconButton } from "@mui/material";
import useFileToURL from "hooks/file/useFileToUrl";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function PreviewFileArea({
    file,
    imageUrl,
    handleClear
}) {
    const previewFileURL = useFileToURL(file);

    return (
        <Box
            className="preview-file"
        >
            <img
                alt={file?.name || "N/A"}
                src={imageUrl || previewFileURL}
                className="preview-file__area"
            />
            {file &&
                <span
                    className="preview-file__panel"
                >
                    <>{file?.name || ""}</>
                    <BootstrapTooltip title="Clear">
                        <IconButton onClick={handleClear} sx={{ width: "40px", padding: "5px" }}>
                            <span>
                                <DeleteForeverIcon sx={{ color: "#fff", width: "20px", height: "20px" }} />
                            </span>
                        </IconButton>
                    </BootstrapTooltip>
                </span>
            }
        </Box>
    )
}