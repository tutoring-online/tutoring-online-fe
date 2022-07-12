import React, { useState } from "react";
import { useSelector } from "react-redux";

import SyllabusCard from "components/Cards/SyllabusCard";
import { Container, Grid } from "@mui/material";

import { isAvailableArray } from "helpers/arrayUtils";
import useSyllabusesWithDetails from "hooks/syllabus/useSyllabusesWithDetails";

import { ProcessBooking } from "crud/payment";
import NoResultContent from "./NoResultContent";
import Guide from "./Guide";
import "./index.scss";
import SyllabusCardSkeleton from "components/Cards/SyllabusCardSkeleton";

const renderSkeleton = () => (
    <>
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
    </>
)

function Home() {
    const filter = useSelector(state => state.syllabus.filter);
    const { syllabusesWithDetails, loading } = useSyllabusesWithDetails(filter);

    const [bookingSyllabus, setBookingSyllabus] = useState(null);
    const [openBooking, setOpenBooking] = useState(null);

    const handleBooking = (syllabus) => {
        if (!syllabus) return;

        setBookingSyllabus(syllabus);
        setOpenBooking(true);
    }

    const handleCloseBooking = () => {
        setBookingSyllabus(null);
        setOpenBooking(false);
    }

    const renderLIstSyllabuses = () => (
        isAvailableArray(syllabusesWithDetails) ? (
            syllabusesWithDetails.map(syllabus =>
                <Grid
                    item
                    key={syllabus.id}
                    xs={12}
                >
                    <SyllabusCard
                        syllabus={syllabus}
                        onBooking={handleBooking}
                    />
                </Grid>
            )
        ) : (
            <>
                <Grid item xs={12}>
                    <NoResultContent />
                </Grid>
            </>
        )
    )

    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12} marginBottom="2rem">
                        <Guide />
                    </Grid>
                    {loading ? renderSkeleton() : renderLIstSyllabuses()}
                </Grid>
            </Container>

            {openBooking &&
                <ProcessBooking
                    open={openBooking}
                    syllabus={bookingSyllabus}
                    handleClose={handleCloseBooking}
                    title="Booking"
                />
            }
        </>
    );
}

export default Home;
