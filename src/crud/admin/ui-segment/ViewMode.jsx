import { Avatar, Box, FormLabel, Grid } from '@mui/material';
import DisplayField from 'components/Form/DisplayField';
import NoInformation from 'components/Text/NoInformation';
import { getLocaleDateString } from 'helpers/dateUtils';
import { getLocaleDateTimeString } from 'helpers/dateUtils';
import { validDate } from 'helpers/dateUtils';
import React from 'react'
import { renderAdminStatus } from 'settings/admin-setting';
import { convertNumberToGender } from 'settings/setting';

const getDisplayDateTime = (updatedDate) => {
    return validDate(updatedDate) ? getLocaleDateTimeString(updatedDate) : "N/A";
}

const getDisplayDate = (updatedDate) => {
    return validDate(updatedDate) ? getLocaleDateString(updatedDate) : "N/A";
}

const HeaderImage = ({ avatarURL }) => {
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80px"
        width="80px"
    >
        <Avatar
            src={avatarURL}
            alt="avatar"
            sx={{ width: 60, height: 60 }}
        />
    </Box>
}

const PublishDate = ({ createdDate }) => (
    <Box
        marginLeft="auto"
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
                <PublishDate createdDate={admin?.createdDate} />
            </Box>

            <Box
                display="flex"
                alignItems="center"
            >
                <Box fontSize="14px">
                    {`Last updated on ${getDisplayDateTime(admin?.updatedDate)}`}
                </Box>
            </Box>
        </Box>
    </Box>
)

export default function ViewMode({ admin }) {
    return (
        <Box component="div">
            <Grid container>
                <Grid item xs={12}>
                    <Header admin={admin} />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DisplayField
                        label="Email"
                        value={admin?.email || <NoInformation />}
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
        </Box>
    );
}
