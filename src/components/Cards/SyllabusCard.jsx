import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import componentStyles from 'assets/theme/components/syllabus-card.js';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles(componentStyles);
const useStylesEllipsis = makeStyles({
    multiLineEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        fontSize: "16px",
        marginTop: "8px"
    },
    lesson: {
        fontSize: "13px",
        fontWeight: "400",
        color: "#7683a7"
    }
});
const syllabusImageUrl = "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/18/2aa16c328a457cb910aa933bf2cd87/Professional-Certificate-Cloud-App.jpg?auto=format%2Ccompress&dpr=3&w=330&h=330&fit=fill&q=25"
// const syllabusVideoUrl = "https://www.youtube.com/watch?v=b9eMGE7QtTk&ab_channel=JavaScriptMastery";


export const SyllabusCard = ({
    syllabus
}) => {
    const styles = useStyles();
    const classes = useStylesEllipsis();
    console.log(syllabus);
    return (
        <Card
            className={cx(styles.root)}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                backgroundColor: "#fff",
            }}
        >
            <CardMedia
                className={styles.media}
                image={
                    syllabusImageUrl ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
                }
            />
            <CardContent className={styles.content}>
                <Box
                    component="h3"
                    margin="0"
                >
                    {syllabus.name}
                </Box>
                <Typography
                    className={classes.multiLineEllipsis}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus. Tquam beatae rerum inventore consectetur, neque doloribus. Quam beatae rerum inventore consectetur, neque doloribus.
                </Typography>
                <Typography
                    className={classes.lesson}
                >
                    {`${syllabus.totalLessons} total lessons`}
                </Typography>

                <Button>Book the course</Button>
            </CardContent>
        </Card>
    );
}

export default SyllabusCard;