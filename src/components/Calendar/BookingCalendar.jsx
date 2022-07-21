import React, { useEffect, useState } from 'react'
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    MonthView,
    ViewSwitcher,
    Toolbar,
    AppointmentTooltip,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import useFilteredLessonList from 'hooks/lesson/useFilteredLessonList';
import { isAvailableArray } from 'helpers/arrayUtils';
import { getLessonStartDate } from 'settings/payment-setting';
import { getLessonEndDate } from 'settings/payment-setting';
import { Box } from '@mui/system';
import BackDropLoader from 'components/Loading/BackDropLoader';

const startDayHour = 8;
const endDayHour = 22;

export default function BookingCalendar({
    payment,
}) {

    const [filter, setFilter] = useState({})
    useEffect(() => {
        if (!payment?.id) {
            setFilter(null);
            return;
        };

        setFilter({ PaymentId: payment.id });
    }, [payment]);

    // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
    const { lessonList, loading, refresh } = useFilteredLessonList(filter);

    const [data, setData] = useState([]);


    useEffect(() => {
        if (!isAvailableArray(lessonList) || !payment) {
            setData([]);
            return;
        }

        const preparedLessons = lessonList.map(lesson => ({
            title: 'Lesson',
            startDate: getLessonStartDate(lesson.date, payment.dateSession),
            endDate: getLessonEndDate(lesson.date, payment.dateSession),
            id: lesson.id,
            location: 'Room 1',
        }))

        setData([...preparedLessons]);

    }, [lessonList, payment])

    return (
        <Box
            position="relative"
        >
            <Paper>
                <Scheduler
                    data={data}
                >
                    <ViewState
                        defaultCurrentViewName="Week"
                    />
                    <DayView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                    />
                    <WeekView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                    />
                    <MonthView />
                    <Toolbar />
                    <ViewSwitcher />
                    <Appointments />
                    <AppointmentTooltip />
                    <DateNavigator />
                </Scheduler>
            </Paper>
            <BackDropLoader
                open={loading}
                style={{
                    position: "absolute",
                    borderRadius: "4px"
                }}
            />
        </Box>
    )
}
