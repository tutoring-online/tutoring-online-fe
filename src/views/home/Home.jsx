import React from "react";

import SyllabusCard from "components/Cards/SyllabusCard";
import { Container, Grid } from "@mui/material";

import { isAvailableArray } from "helpers/arrayUtils";
import useSyllabusesWithDetails from "hooks/syllabus/useSyllabusesWithDetails";
import "./index.scss";
import useSyllabusList from "hooks/syllabus/useSyllabusList";
import Guide from "./Guide";
import NoResultContent from "./NoResultContent";

function Home() {
    const { syllabusesWithDetails } = useSyllabusesWithDetails();
    const { syllabusList } = useSyllabusList();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} marginBottom="2rem">
                    <Guide />
                </Grid>
                {isAvailableArray(syllabusesWithDetails) ? (
                    syllabusesWithDetails.map(syllabus =>
                        <Grid
                            item
                            key={syllabus.id}
                            xs={12}
                        >
                            <SyllabusCard
                                syllabus={syllabus}
                            />
                        </Grid>
                    )
                ) : (
                    <>
                        <Grid item xs={12}>
                            <NoResultContent />
                        </Grid>
                        {isAvailableArray(syllabusList) && syllabusList.filter((syllabus, index) => index < 5).map(syllabus =>
                            <Grid
                                item
                                key={syllabus.id}
                                xs={12}
                            >
                                <SyllabusCard
                                    syllabus={syllabus}
                                />
                            </Grid>
                        )}
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default Home;
