import React from "react";
import { FormLabel, Grid } from "@mui/material";
import GroupBox from "components/Form/GroupBox";
import NoInformation from "components/Text/NoInformation";
import { Box } from "@mui/material";
import { validDate } from "helpers/dateUtils";
import { getLocaleDateTimeString } from "helpers/dateUtils";
import { getLocaleDateString } from "helpers/dateUtils";
import { renderCategoryStatus } from "settings/category-setting";

const getDisplayDateTime = (date) => {
  return validDate(date) ? getLocaleDateTimeString(date) : "N/A";
};

const getDisplayDate = (date) => {
  return validDate(date) ? getLocaleDateString(date) : "N/A";
};

const PublishDate = ({ createdDate }) => (
  <Box fontSize="14px">
    <Box display="flex">
      <FormLabel sx={{ margin: 0 }}>Publish at</FormLabel>
      <Box marginLeft="4px" fontSize="14px">
        {getDisplayDate(createdDate)}
      </Box>
    </Box>
  </Box>
);

const StatusBar = ({ status }) => (
  <Box fontSize="13px" marginLeft="8px">
    {renderCategoryStatus(status)}
  </Box>
);

const UpdatedDate = ({ updatedDate }) => (
  <Box marginLeft="auto" fontSize="14px">
    <Box display="flex">
      <FormLabel sx={{ margin: 0 }}>Last updated on</FormLabel>
      <Box marginLeft="4px" fontSize="14px">
        {getDisplayDateTime(updatedDate)}
      </Box>
    </Box>
  </Box>
);

const Header = ({ category }) => (
  <Box marginBottom="1rem" className="detail-header">
    <Box
      display="grid"
      gridTemplateRows="1fr 1fr"
      gridTemplateColumns="1fr"
      flexGrow="1"
      padding="0 1rem"
      minHeight="80px"
    >
      <Box display="flex" alignItems="center" height="100%">
        <Box fontWeight="600" fontSize="17px">
          {category?.name}
        </Box>
        <StatusBar status={category?.status} />
        {/* <Box alignSelf="left" marginLeft="15rem">Subject: {category?.totalSubject || <NoInformation />}</Box> */}
      </Box>
      

      <Box display="flex" alignItems="center">
        <PublishDate createdDate={category?.createdDate} />
        <UpdatedDate updatedDate={category?.updatedDate} />
      </Box>
    </Box>
  </Box>
);

const Description = ({ category }) => (
  <GroupBox>
    <Grid container>
      <Grid item xs={12}>
        <FormLabel sx={{ fontSize: "18px" }}>Description</FormLabel>
      </Grid>

      <Grid item xs={12}>
        <FormLabel sx={{ fontSize: "14px" }} style={{ fontWeight: "normal" }}>
          {category?.address || <NoInformation />} 
        </FormLabel>
      </Grid>
    </Grid>
  </GroupBox>
);

export default function ViewMode({ category }) {
  return (
    <Box component="div">
      <Grid container>
        <Grid item xs={12}>
          <Header category={category} />
        </Grid>
        <Grid item xs={12}>
          <Description category={category} />
        </Grid>
      </Grid>
    </Box>
  );
}
