import React from "react";

import TutorCard from "components/Cards/TutorCard";
import TutorSchedule from "components/Cards/TutorSchedule";
import { Container } from "@mui/material";

import "./index.scss";

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

    return (
        <Container maxWidth="xl">
            <div className="home-view">
                <Item>
                    <TutorCard />
                </Item>
                <Item>
                    <TutorCard />
                </Item>
                <Item>
                    <TutorCard />
                </Item>
                <Item>
                    <TutorCard />
                </Item>
                <Item>
                    <TutorCard />
                </Item>

                <RightItem>
                    <TutorSchedule />
                </RightItem>
            </div>
        </Container>
    );
}

export default Home;
