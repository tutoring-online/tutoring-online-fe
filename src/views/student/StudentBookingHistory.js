import makeStyles from '@mui/styles/makeStyles';
import componentStyles from "assets/theme/views/admin/tables.js";
import { Box, Container } from "@mui/system";
import EmptyHeader from "components/Headers/EmptyHeader";

import { useSelector } from 'react-redux';
import { isAvailableArray } from 'helpers/arrayUtils';
import useBookingRecords from 'hooks/student/useBookingRecords';
import BookingSyllabusCard from 'components/Cards/BookingSyllabusCard';
import { Grid } from '@mui/material';

const useStyles = makeStyles(componentStyles);

const TutorSchedule = () => {
    const styleClasses = useStyles();
    const user = useSelector(state => state.auth.user);
    const { bookingRecords } = useBookingRecords(user?.id);


    return (
        <>
            <EmptyHeader />
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: styleClasses.containerRoot }}
            >
                <Grid container spacing={2}>
                    {isAvailableArray(bookingRecords) && bookingRecords.map(record =>
                        <Grid
                            item
                            key={record.id}
                            xs={12}
                        >
                            <BookingSyllabusCard
                                payment={record}
                                syllabus={record.syllabus}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
}

export default TutorSchedule;