import { Avatar, Box, FormLabel, Grid } from '@mui/material';
import SmallSyllabusCard from 'components/Cards/SmallSyllabusCard';
import DisplayField from 'components/Form/DisplayField';
import GroupBox from 'components/Form/GroupBox';
// import GroupBox from 'components/Form/GroupBox';
// import { getLocaleDateString } from 'helpers/dateUtils';
// import { getLocaleDateTimeString } from 'helpers/dateUtils';
// import { validDate } from 'helpers/dateUtils';
import React from 'react'
import { renderAdminStatus } from 'settings/admin-setting';
import { renderPaymentStatus } from 'settings/payment-setting';
import { getDateSessionLabel } from 'settings/payment-setting';
import { getComboLabel } from 'settings/payment-setting';

// const getDisplayDateTime = (date) => {
//     return validDate(date) ? getLocaleDateTimeString(date) : "N/A";
// }

// const getDisplayDate = (date) => {
//     return validDate(date) ? getLocaleDateString(date) : "N/A";
// }

const StatusBar = ({ status }) => (
    <Box
        fontSize="13px"
        marginLeft="8px"
    >
        {renderAdminStatus(status)}
    </Box>
)

const ClassInfo = ({ payment }) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Class Info
                </FormLabel>
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Student"
                    value={
                        <Box
                            display="flex"
                        >
                            <Avatar
                                src={payment?.student?.avatarURL}
                                alt="Tutor avatar"
                                sx={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                            <Box marginLeft="0.5rem">
                                {payment?.student?.name || <i>Not allocated yet</i>}
                            </Box>
                        </Box>
                    }
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DisplayField
                    label="Tutor"
                    value={
                        <Box
                            display="flex"
                        >
                            <Avatar
                                src={payment?.tutor?.avatarURL}
                                alt="Tutor avatar"
                                sx={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                            <Box marginLeft="0.5rem">
                                {payment?.tutor?.name || <i>Not allocated yet</i>}
                            </Box>
                        </Box>
                    }
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const BookingInfo = ({ payment }) => (
    <GroupBox>
        <Grid container spacing={2} rowSpacing={1}>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Payment details
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
            <Grid item xs={12}>
                <DisplayField
                    label="Status"
                    value={renderPaymentStatus(payment?.status)}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

export default function ViewMode({ payment }) {
    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BookingInfo payment={payment} />
                </Grid>
                <Grid item xs={12}>
                    <ClassInfo payment={payment} />
                </Grid>

            </Grid>
        </Box>
    );
}
