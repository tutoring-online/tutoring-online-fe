import makeStyles from '@mui/styles/makeStyles';
import componentStyles from "assets/theme/views/admin/tables.js";
import { Box, Container } from "@mui/system";
import EmptyHeader from "components/Headers/EmptyHeader";

import { useSelector } from 'react-redux';
import { isAvailableArray } from 'helpers/arrayUtils';
import useBookingRecords from 'hooks/student/useBookingRecords';
import BookingSyllabusCard from 'components/Cards/BookingSyllabusCard';
import { Grid } from '@mui/material';
import SyllabusCardSkeleton from 'components/Cards/SyllabusCardSkeleton';

const useStyles = makeStyles(componentStyles);

const renderSkeleton = () => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <SyllabusCardSkeleton />
        </Grid>
        <Grid item xs={12}        >
            <SyllabusCardSkeleton />
        </Grid>
        <Grid item xs={12}        >
            <SyllabusCardSkeleton />
        </Grid>
        <Grid item xs={12}        >
            <SyllabusCardSkeleton />
        </Grid>
        <Grid item xs={12}        >
            <SyllabusCardSkeleton />
        </Grid>
    </Grid>
)

const TutorSchedule = () => {
    const styleClasses = useStyles();
    const user = useSelector(state => state.auth.user);
    const { bookingRecords, loading, refresh } = useBookingRecords(user?.id);

    const renderList = () => (
        <Grid container spacing={2}>
            {isAvailableArray(bookingRecords) && bookingRecords.map(record =>
                <Grid
                    item
                    key={record.id}
                    xs={12}
                >
                    <BookingSyllabusCard
                        payment={record}
                        refresh={refresh}
                    />
                </Grid>
            )}
        </Grid>
    )

    return (
        <>
            <EmptyHeader />
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: styleClasses.containerRoot }}
            >
                {loading ? renderSkeleton() : renderList()}
            </Container>
        </>
    )
}

export default TutorSchedule;