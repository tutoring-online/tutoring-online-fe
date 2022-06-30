import { Grid } from "@mui/material";
import LabelSkeleton from "components/Skeleton/LabelSkeleton";
import ValueSkeleton from "components/Skeleton/ValueSkeleton";

const ViewModeSkeleton = () => (
  <Grid container>
    <Grid item xs={12} marginBottom="1rem">
      <LabelSkeleton />
      <ValueSkeleton />
    </Grid>
    <Grid item xs={12} marginBottom="1rem">
      <LabelSkeleton />
      <ValueSkeleton />
    </Grid>
  </Grid>
);

export default ViewModeSkeleton;
