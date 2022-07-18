import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

//Mui
import { Avatar, Box, Button, FormLabel, Grid } from '@mui/material';

//Core components
import BookingCalendar from 'components/Calendar/BookingCalendar';
import SmallSyllabusCard from 'components/Cards/SmallSyllabusCard';
import DisplayField from 'components/Form/DisplayField';
import GroupBox from 'components/Form/GroupBox';
import PersonSearch from '@mui/icons-material/PersonSearch';
import SelectField from 'components/Form/SelectField';

//Helpers
import { getLocaleDateString } from 'helpers/dateUtils';
import { getLocaleDateTimeString } from 'helpers/dateUtils';
import { validDate } from 'helpers/dateUtils';
import { renderPaymentStatus } from 'settings/payment-setting';
import { getDateSessionLabel } from 'settings/payment-setting';
import { getComboLabel } from 'settings/payment-setting';
import { isAvailableArray } from 'helpers/arrayUtils';
import { PAYMENT_STATUSES } from 'settings/payment-setting';

//Hooks
import useTutorList from 'hooks/tutor/useTutorList';
import useSyllabusDetail from 'hooks/syllabus/useSyllabusDetail';
import useTutorSubjectList from 'hooks/tutor-subject/useTutorSubjectList';
import useTutorDetail from 'hooks/tutor/useTutorDetail';

const getDisplayDateTime = (date) => {
    return validDate(date) ? getLocaleDateTimeString(date) : "N/A";
}

const getDisplayDate = (date) => {
    return validDate(date) ? getLocaleDateString(date) : "N/A";
}


const StartDate = ({ date }) => (
    <Box
        fontSize="14px"
    >
        <Box display="flex">
            <FormLabel sx={{ margin: 0 }}>* Class starts on</FormLabel>
            <Box
                marginLeft="4px"
                fontSize="14px"
            >
                {getDisplayDate(date)}
            </Box>
        </Box>
    </Box>
)

const EndDate = ({ date }) => (
    <Box
        marginLeft="4px"
        fontSize="14px"
    >
        <Box display="flex">
            <FormLabel sx={{ margin: 0 }}> and will finished on</FormLabel>
            <Box
                marginLeft="4px"
                fontSize="14px"
            >
                {getDisplayDateTime(date)}
            </Box>
        </Box>
    </Box>
)

const useAvailableTutors = (syllabusId) => {
    const { tutorList } = useTutorList();
    const { tutorSubjectList } = useTutorSubjectList();
    const { syllabusDetail } = useSyllabusDetail(syllabusId);
    const [availableTutorOptions, setAvailableTutorOptions] = useState([]);

    useEffect(() => {
        if (!syllabusDetail) {
            setAvailableTutorOptions([]);
        }

        const getTutor = (tutorSubject) => isAvailableArray(tutorList) &&
            tutorList.find(item => item.id === tutorSubject.tutorId);

        const options = isAvailableArray(tutorSubjectList) && tutorSubjectList
            .filter(item => item.subjectId === syllabusDetail.subjectId)
            .map(getTutor)
            .filter(item => Boolean(item))
            .map(item => ({
                label: item.name,
                value: item.id
            }))

        setAvailableTutorOptions(options || []);
    }, [syllabusDetail, tutorList, tutorSubjectList]);

    return availableTutorOptions;
}

const ClassInfo = ({
    payment,
    onAllocateTutor
}) => {

    const availableTutorOptions = useAvailableTutors(payment?.syllabus?.id);
    const { tutorDetail } = useTutorDetail(payment?.tutorId);

    const {
        handleSubmit,
        control,
    } = useForm({
        mode: "onSubmit",
        defaultValues: { tutorId: null },
    });

    const tutorId = useWatch({ control, name: "tutorId" });

    const onSubmit = (data) => {
        const preparedData = {
            ...data,
        }
        onAllocateTutor(preparedData);
    }

    return (
        <GroupBox>
            <Grid container spacing={2}>
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
                            payment?.tutorId && tutorDetail ?
                                <Box
                                    display="flex"
                                >
                                    <Avatar
                                        src={tutorDetail?.avatarURL}
                                        alt="Tutor avatar"
                                        sx={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <Box marginLeft="0.5rem">
                                        {tutorDetail?.name}
                                    </Box>
                                </Box>
                                :
                                <Box display="flex">
                                    <i>Not allocated yet</i>
                                </Box>
                        }
                    />
                </Grid>

                {payment?.status === PAYMENT_STATUSES.ONGOING &&
                    <>
                        <Grid item xs={12} >
                            <Box
                                component="div"
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-start"
                            >
                                <StartDate date={payment?.startDate} />
                                <EndDate date={payment?.endDate} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <DisplayField
                                label={
                                    <Box
                                        component="h3"
                                        textAlign="center"
                                        width="100%"
                                    >
                                        Schedule
                                    </Box>
                                }
                                value={
                                    <BookingCalendar
                                        payment={payment}
                                    />
                                }
                            />
                        </Grid>

                    </>
                }

                <Grid item xs={12}>
                    {payment?.status === PAYMENT_STATUSES.PAID &&
                        <Box>
                            <SelectField
                                label="Available tutors"
                                name="tutorId"
                                control={control}
                                options={availableTutorOptions}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={tutorId == null}
                                onClick={handleSubmit(onSubmit)}
                                startIcon={<PersonSearch fontSize="medium" />}
                                sx={{
                                    marginLeft: "auto",
                                    marginTop: "-1rem"
                                }}
                            >
                                Allocate tutors
                            </Button>
                        </Box>
                    }
                </Grid>
            </Grid>
        </GroupBox>
    )
}

const BookingInfo = ({ payment }) => (
    <GroupBox>
        <Grid container spacing={2} rowSpacing={1}>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Payment details
                </FormLabel>
            </Grid>

            <Grid item xs={12}>
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

export default function ViewMode({
    payment,
    onAllocateTutor
}) {
    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BookingInfo payment={payment} />
                </Grid>
                <Grid item xs={12}>
                    <ClassInfo
                        payment={payment}
                        onAllocateTutor={onAllocateTutor}
                    />
                </Grid>

            </Grid>
        </Box>
    );
}
