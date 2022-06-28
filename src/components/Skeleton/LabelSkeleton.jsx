import { Skeleton } from "@mui/material"

const LabelSkeleton = () => (
    <Skeleton
        variant="text"
        animation="wave"
        width={200}
        height={20}
        style={{ marginBottom: "0.5rem" }}
    />
)

export default LabelSkeleton;