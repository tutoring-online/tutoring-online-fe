import {Grid, Box, Skeleton} from "@mui/material";
import LabelSkeleton from "components/Skeleton/LabelSkeleton";
import ValueSkeleton from "components/Skeleton/ValueSkeleton";

const ViewModeSkeleton = () => (
    <Grid container>
        <Grid item xs={12}>
            <Box
                display="flex"
                marginBottom="1rem"
                height="80px"
            >
                <Skeleton
                    variant="circular"
                    width={60}
                    height={60}
                    animation="wave"
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="1rem"
                >
                    <Skeleton
                        variant="text"
                        height={24}
                        width={160}
                        animation="wave"
                    />
                    <Skeleton
                        variant="text"
                        height={24}
                        width={300}
                        animation="wave"
                        style={{ marginTop: "0.25rem" }}
                    />
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6} marginBottom="1rem">
            <LabelSkeleton />
            <ValueSkeleton />
        </Grid>
        <Grid item xs={12} lg={6} marginBottom="1rem">
            <LabelSkeleton />
            <ValueSkeleton />
        </Grid>
        <Grid item xs={12} lg={6} marginBottom="1rem">
            <LabelSkeleton />
            <ValueSkeleton />
        </Grid>
        <Grid item xs={12} lg={6} marginBottom="1rem">
            <LabelSkeleton />
            <ValueSkeleton />

        </Grid>
        <Grid item xs={12} marginBottom="1rem">
            <LabelSkeleton />
            <ValueSkeleton />
        </Grid>
    </Grid>
)

export default ViewModeSkeleton;