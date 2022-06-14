import { Box } from "@mui/system";

const TextDanger = ({ children, ...props }) => (
    <Box
        color="#ff0000"
        {...props}
    >
        {children}
    </Box>
)

export default TextDanger;