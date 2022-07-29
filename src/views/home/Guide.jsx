import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { MeetingImage } from 'nta-team/nta-img'
import { CalendarImage } from 'nta-team/nta-img'
import { MoneyImage } from 'nta-team/nta-img'
import { ResearchImage } from 'nta-team/nta-img'
import React from 'react'

export default function Guide() {
    return (
        <Grid
            container
            spacing={2}
            rowSpacing={3}
            justifyContent="space-between"
        >
            <Grid item xs={6} md={3}>
                <Box
                    backgroundColor="#fff"
                    borderRadius="1rem"
                    padding="0.5rem"

                    display="flex"
                    flexDirection="row"
                >
                    <ResearchImage width={40} height={40} />
                    <Typography fontSize={14} marginLeft="0.5rem">
                        1. Search a course for your need
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} md={3}>
                <Box
                    backgroundColor="#fff"
                    borderRadius="1rem"
                    padding="0.5rem"

                    display="flex"
                    flexDirection="row"
                >
                    <MoneyImage width={40} height={40} />
                    <Typography fontSize={14} marginLeft="0.5rem">
                        2. Pay your order, then wait us to find a tutor for you
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} md={3}>
                <Box
                    backgroundColor="#fff"
                    borderRadius="1rem"
                    padding="0.5rem"

                    display="flex"
                    flexDirection="row"
                >
                    <CalendarImage width={40} height={40} />
                    <Typography fontSize={14} marginLeft="0.5rem">
                        3. When schedule is ready, check study time
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} md={3}>
                <Box
                    backgroundColor="#fff"
                    borderRadius="1rem"
                    padding="0.5rem"

                    display="flex"
                    flexDirection="row"
                >
                    <MeetingImage width={40} height={40} />
                    <Typography fontSize={14} marginLeft="0.5rem">
                        4. Join the meeting for tutor online.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
