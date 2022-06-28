import { Skeleton } from "@mui/material"

const ValueSkeleton = () => (
    <Skeleton
        variant="rectangular"
        animation="wave"
        height={43}
        style={{ marginBottom: "1rem" }}
    />
)

export default ValueSkeleton;