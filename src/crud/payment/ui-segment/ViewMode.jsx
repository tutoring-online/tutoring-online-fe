import { Avatar, Box, FormLabel, Grid } from '@mui/material';
import SmallSyllabusCard from 'components/Cards/SmallSyllabusCard';
import DisplayField from 'components/Form/DisplayField';
import GroupBox from 'components/Form/GroupBox';
// import GroupBox from 'components/Form/GroupBox';
import { getLocaleDateString } from 'helpers/dateUtils';
import { getLocaleDateTimeString } from 'helpers/dateUtils';
import { validDate } from 'helpers/dateUtils';
import React from 'react'
import { renderAdminStatus } from 'settings/admin-setting';
import { getDateSessionLabel } from 'settings/payment-setting';
import { getComboLabel } from 'settings/payment-setting';

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

const StatusBar = ({ status }) => (
    <Box
        fontSize="13px"
        marginLeft="8px"
    >
        {renderAdminStatus(status)}
    </Box>
)

const StudentInfo = ({ payment }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Student Info
                </FormLabel>
            </Grid>

            <Grid item xs={12}>
                <Box
                    marginBottom="1rem"
                    className="detail-header"
                >
                    <HeaderImage avatarURL={payment?.student?.avatarURL} />

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
                                {payment?.student?.name}
                            </Box>
                            <StatusBar status={payment?.student?.status} />
                        </Box>

                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <PublishDate createdDate={payment?.student?.createdDate} />
                            <UpdatedDate updatedDate={payment?.student?.updatedDate} />                    </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </GroupBox>
)

const SyllabusInfo = ({ payment }) => (
    <GroupBox>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Product Info
                </FormLabel>
            </Grid>

            <Grid item xs={12} paddingTop="0 !important">
                <SmallSyllabusCard
                    syllabus={payment?.syllabus}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Combo"
                    value={getComboLabel(payment?.combo)}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Date session"
                    value={getDateSessionLabel(payment?.dateSession)}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const TutorInfo = ({ payment }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Student Info
                </FormLabel>
            </Grid>

            <Grid item xs={12}>
                <Box
                    marginBottom="1rem"
                    className="detail-header"
                >
                    <HeaderImage avatarURL={payment?.student?.avatarURL} />

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
                                {payment?.student?.name}
                            </Box>
                            <StatusBar status={payment?.student?.status} />
                        </Box>

                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <PublishDate createdDate={payment?.student?.createdDate} />
                            <UpdatedDate updatedDate={payment?.student?.updatedDate} />                    </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </GroupBox>
)

export default function ViewMode({ payment }) {
    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StudentInfo payment={payment} />
                </Grid>

                <Grid item xs={12}>
                    <SyllabusInfo payment={payment} />
                </Grid>

                <Grid item xs={12}>
                    <TutorInfo/>
                </Grid>
            </Grid>
        </Box>
    );
}
