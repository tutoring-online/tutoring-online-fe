import { Grid, Box, Skeleton } from "@mui/material";
import LabelSkeleton from "components/Skeleton/LabelSkeleton";
import ValueSkeleton from "components/Skeleton/ValueSkeleton";

const ViewModeSkeleton = () => (
  <Grid container>
    <Grid item xs={12}>
      <LabelSkeleton />
      <ValueSkeleton />
    </Grid>
    <Grid item xs={12} alignItems="center">
      <LabelSkeleton />
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={150}
        style={{ marginBottom: "1rem" }}
      />
    </Grid>
    <Grid item xs={12} alignItems="center">
      <LabelSkeleton />
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={70}
        style={{ marginBottom: "1rem" }}
      />
    </Grid>
  </Grid>
);

export default ViewModeSkeleton;
