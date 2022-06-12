import React from "react";

import Grid from "@mui/material/Grid";
import TutorCard from "components/Cards/TutorCard";
import TutorSearch from "components/Search/TutorSearch";

function Home() {

    return (
        <>
            <Grid item xs={12} lg={12} md={12}>
                <TutorSearch />
            </Grid>
            <Grid item xs={12} lg={8} md={12} rowGap={16}>
                <TutorCard />
                <TutorCard />
                <TutorCard />
                <TutorCard />
                <TutorCard />
                <TutorCard />
            </Grid>
        </>
    );
}

export default Home;
