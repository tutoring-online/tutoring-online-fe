import { Avatar, Box, FormLabel, Grid } from '@mui/material';
import DisplayField from 'components/Form/DisplayField';
import GroupBox from 'components/Form/GroupBox';
import NoInformation from 'components/Text/NoInformation';
import { getLocaleDateString } from 'helpers/dateUtils';
import { getLocaleDateTimeString } from 'helpers/dateUtils';
import { validDate } from 'helpers/dateUtils';
import React from 'react'
import { renderTutorStatus } from 'settings/tutor-setting';
import { convertNumberToGender } from 'settings/setting';
import CopyToClipboardWrapper from 'components/common/CopyToClipboardWrapper';

const getDisplayDateTime = (date) => {
    return validDate(date) ? getLocaleDateTimeString(date) : "N/A";
}

const getDisplayDate = (date) => {
    return validDate(date) ? getLocaleDateString(date) : "N/A";
}

const HeaderImage = ({ avatarURL }) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="0.5rem 1rem"
    >
        <Avatar
            src={avatarURL}
            alt="avatar"
            sx={{ width: 60, height: 60 }}
        />
    </Box>
)

const PublishDate = ({ createdDate }) => (
    <Box
        fontSize="14px"
    >
        <Box display="flex">
            <FormLabel sx={{ margin: 0 }}>Publish at</FormLabel>
            <Box
                marginLeft="4px"
                fontSize="14px"
            >
                {getDisplayDate(createdDate)}
            </Box>
        </Box>
    </Box>
)

const StatusBar = ({ status }) => (
    <Box
        fontSize="13px"
        marginLeft="8px"
    >
        {renderTutorStatus(status)}
    </Box>
)

const UpdatedDate = ({ updatedDate }) => (
    <Box
        marginLeft="auto"
        fontSize="14px"
    >
        <Box display="flex">
            <FormLabel sx={{ margin: 0 }}>Last updated on</FormLabel>
            <Box
                marginLeft="4px"
                fontSize="14px"
            >
                {getDisplayDateTime(updatedDate)}
            </Box>
        </Box>
    </Box>
)

const Header = ({ tutor }) => (
    <Box
        className="detail-header"
    >
        <HeaderImage avatarURL={tutor?.avatarURL} />

        <Box
            display="grid"
            gridTemplateRows="1fr 1fr"
            gridTemplateColumns="1fr"

            flexGrow="1"
            padding="0 1rem"
            minHeight="80px"
        >
            <Box
                display="flex"
                alignItems="center"
                height="100%"
            >
                <Box fontWeight="600" fontSize="17px">
                    {tutor?.name}
                </Box>
                <StatusBar status={tutor?.status} />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <PublishDate createdDate={tutor?.createdDate} />
                <UpdatedDate updatedDate={tutor?.updatedDate} />
            </Box>
        </Box>
    </Box>
)

const BasicInfo = ({ tutor }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Basic info
                </FormLabel>
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Name"
                    value={tutor?.name || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Birthday"
                    value={tutor?.birthday || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Gender"
                    value={convertNumberToGender(tutor?.gender) || <NoInformation />}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const Contact = ({ tutor }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Contact
                </FormLabel>
            </Grid>
            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Email"
                    value={tutor?.email || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Phone"
                    value={tutor?.phone || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12}>
                <DisplayField
                    label="Link meeting"
                    value={
                        <Box
                            padding="0.5rem 1rem"
                            paddingRight="2rem"
                            borderRadius="8px"
                            bgcolor="#f7f7f7"
                        >
                            <CopyToClipboardWrapper
                                text={tutor?.meetingUrl}
                            >
                                {tutor?.meetingUrl || <NoInformation />}
                            </CopyToClipboardWrapper>
                        </Box>
                    }
                />
            </Grid>

            <Grid item xs={12}>
                <DisplayField
                    label="Address"
                    value={tutor?.address || <NoInformation />}
                />
            </Grid>
        </Grid>
    </GroupBox>
)


export default function ViewMode({ tutor }) {
    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header tutor={tutor} />
                </Grid>

                <Grid item xs={12}>
                    <BasicInfo tutor={tutor} />
                </Grid>

                <Grid item xs={12}>
                    <Contact tutor={tutor} />
                </Grid>
            </Grid>
        </Box>
    );
}
