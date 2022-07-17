import React from 'react';
import { Box, Grid, FormLabel } from '@mui/material';
import { validDate } from "helpers/dateUtils";
import { getLocaleDateTimeString } from "helpers/dateUtils";
import { getLocaleDateString } from "helpers/dateUtils";
import { renderSyllabusStatus } from "settings/syllabus-setting";
import GroupBox from "components/Form/GroupBox";
import NoInformation from "components/Text/NoInformation";
import DisplayField from "components/Form/DisplayField";

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
    {renderSyllabusStatus(status)}
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

const Header = ({ syllabus }) => (
  <Box className="detail-header">
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
          {syllabus?.name}
        </Box>
        <StatusBar status={syllabus?.status} />
      </Box>

      <Box display="flex" alignItems="center">
        <PublishDate createdDate={syllabus?.createdDate} />
        <UpdatedDate updatedDate={syllabus?.updatedDate} />
      </Box>
    </Box>
  </Box>
);

const BasicInfo = ({ syllabus }) => (
  <GroupBox>
    <Grid container>
      <Grid item xs={12}>
        <FormLabel sx={{ fontSize: "18px" }}>Basic Info</FormLabel>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisplayField label="Name" value={syllabus?.name || <NoInformation />} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DisplayField label="Price" value={syllabus?.price || <NoInformation />} />
      </Grid>
    </Grid>
  </GroupBox>
);

const Description = ({ syllabus }) => (
  <GroupBox>
    <Grid container>
      <Grid item xs={12}>
        <FormLabel sx={{ fontSize: "18px" }}>Description</FormLabel>
      </Grid>

      <Grid item xs={12}>
        <FormLabel sx={{ fontSize: "14px" }} style={{ fontWeight: "normal" }}>
          {syllabus?.description || <NoInformation />}
        </FormLabel>
      </Grid>
    </Grid>
  </GroupBox>
);

export default function ViewMode({ syllabus }) {
  return (
    <Box component="div">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header syllabus={syllabus} />
        </Grid>
        <Grid item xs={12}>
          <BasicInfo syllabus={syllabus} />
        </Grid>

        <Grid item xs={12}>
          <Description syllabus={syllabus} />
        </Grid>
      </Grid>
    </Box>
  );
}
