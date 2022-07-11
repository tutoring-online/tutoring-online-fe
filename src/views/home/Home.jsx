import React from "react";

import SyllabusCard from "components/Cards/SyllabusCard";
import TutorSchedule from "components/Cards/TutorSchedule";
import { Container } from "@mui/material";

import "./index.scss";
import useSyllabusList from "hooks/syllabus/useSyllabusList";
import { isAvailableArray } from "helpers/arrayUtils";

const Item = ({ children }) => (
    <div className="home-view__item">
        {children}
    </div>
)

const RightItem = ({ children }) => (
    <div className="home-view__right-item">
        {children}
    </div>
)

function Home() {
    const { syllabusList } = useSyllabusList();

    return (
        <Container maxWidth="xl">
            <div className="home-view">
                {isAvailableArray(syllabusList) && syllabusList.map((syllabus, index) =>
                    <Item key={syllabus.id || index}>
                        <SyllabusCard
                            syllabus={syllabus}
                        />
                    </Item>
                )}
            </div>
        </Container>
    );
}

export default Home;
