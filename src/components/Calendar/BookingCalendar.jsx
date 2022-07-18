import React from 'react'
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    MonthView,
    ViewSwitcher,
    Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

const startDayHour = 8;
const endDayHour = 22;

export default function BookingCalendar({
    paymentId
}) {
    

    return (
        <Paper>
            <Scheduler>
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
            </Scheduler>
        </Paper>
    )
}
