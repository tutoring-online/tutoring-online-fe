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
import DelayRenderWrapper from 'nta-team/DelayRenderWrapper';
import { DELAY_RENDER_DIRECTION } from 'nta-team/DelayRenderWrapper';
import { useMemo } from 'react';

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

    const reorderRecords = useMemo(() => {
        if (!isAvailableArray(bookingRecords)) return [];
        const temp = [...bookingRecords];
        temp.reverse();
        return temp;
    }, [bookingRecords])

    const renderList = () => (
        <Grid container spacing={2}>
            {reorderRecords.map(record =>
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
                <DelayRenderWrapper
                    isRender={loading}
                    direction={DELAY_RENDER_DIRECTION.stopRender}
                >
                    {renderSkeleton()}
                </DelayRenderWrapper>
                <DelayRenderWrapper
                    isRender={!loading}
                    delay={100}
                    direction={DELAY_RENDER_DIRECTION.render}
                >
                    {renderList()}
                </DelayRenderWrapper>
            </Container>
        </>
    )
}

export default TutorSchedule;