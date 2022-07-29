import React from 'react'
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
import CustomAppointmentContent from './CustomAppointmentContent';

const startDayHour = 8;
const endDayHour = 22;


export default function DashBoardCalendar({
    lessons,
}) {

    return (
        <Paper>
            <Scheduler
                data={lessons || []}
            >
                <ViewState
                    defaultCurrentViewName="Month"
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
                <AppointmentTooltip
                    contentComponent={CustomAppointmentContent}
                />
                <DateNavigator />
            </Scheduler>
        </Paper>
    )
}
