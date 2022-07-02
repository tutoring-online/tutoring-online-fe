import { Avatar, Box, FormLabel, Grid } from '@mui/material';
import DisplayField from 'components/Form/DisplayField';
import GroupBox from 'components/Form/GroupBox';
import NoInformation from 'components/Text/NoInformation';
import { getLocaleDateString } from 'helpers/dateUtils';
import { getLocaleDateTimeString } from 'helpers/dateUtils';
import { validDate } from 'helpers/dateUtils';
import React from 'react'
import { renderAdminStatus } from 'settings/admin-setting';
import { convertNumberToGender } from 'settings/setting';

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
        {renderAdminStatus(status)}
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

const Header = ({ admin }) => (
    <Box
        marginBottom="1rem"
        className="detail-header"
    >
        <HeaderImage avatarURL={admin?.avatarURL} />

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
                    {admin?.name}
                </Box>
                <StatusBar status={admin?.status} />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <PublishDate createdDate={admin?.createdDate} />
                <UpdatedDate updatedDate={admin?.updatedDate} />
            </Box>
        </Box>
    </Box>
)

const BasicInfo = ({ admin }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Basic Info
                </FormLabel>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DisplayField
                    label="Name"
                    value={admin?.name || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <DisplayField
                    label="Birthday"
                    value={admin?.birthday || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <DisplayField
                    label="Gender"
                    value={convertNumberToGender(admin?.gender) || <NoInformation />}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const Contact = ({ admin }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Contact
                </FormLabel>
            </Grid>
            <Grid item xs={12} lg={6}>
                <DisplayField
                    label="Email"
                    value={admin?.email || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <DisplayField
                    label="Phone"
                    value={admin?.phone || <NoInformation />}
                />
            </Grid>

            <Grid item xs={12}>
                <DisplayField
                    label="Address"
                    value={admin?.address || <NoInformation />}
                />
            </Grid>
        </Grid>
    </GroupBox>
)


export default function ViewMode({ admin }) {
    return (
        <Box component="div">
            <Grid container >
                <Grid item xs={12}>
                    <Header admin={admin} />
                </Grid>

                <Grid item xs={12}>
                    <BasicInfo admin={admin} />
                </Grid>

                <Grid item xs={12}>
                    <Contact admin={admin} />
                </Grid>
            </Grid>
        </Box>
    );
}
