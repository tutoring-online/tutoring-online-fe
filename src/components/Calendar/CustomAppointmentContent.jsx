import { Button, Grid } from '@mui/material';
import Room from '@mui/icons-material/Room';
import { MeetingImage } from 'nta-team/nta-img';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';


const CustomAppointmentContent = (({
    children, appointmentData, ...restProps
}) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        {children}
        <Grid container alignItems="center">
            <Grid
                item
                xs={2}
                textAlign="center"
            >
                <Room />
            </Grid>
            <Grid item xs={10}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{
                        width: "100%"
                    }}
                    startIcon={
                        <MeetingImage width={20} height={20} />
                    }
                    onClick={() => {
                        const url = appointmentData.meetingUrl;
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                >
                    Go to meeting
                </Button>
            </Grid>
        </Grid>
    </AppointmentTooltip.Content>
));

export default CustomAppointmentContent;