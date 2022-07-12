import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import componentStyles from 'assets/theme/components/small-syllabus-card.js';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ReactNumberFormat from 'react-number-format';

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

const getPrice = (syllabus) => {
    const price = syllabus?.price;
    if (!price) return 0;
    if (isNaN(price)) return 0;
    return parseInt(price);
}

export const SmallSyllabusCard = ({
    syllabus,
}) => {
    const styles = useStyles();
    const classes = useStylesEllipsis();

    return (
        syllabus &&
        <Card
            className={cx(styles.root)}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                backgroundColor: "#fff",
                width: "100%",
                height: "100px"
            }}
            component="div"
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
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        component="h3"
                        margin="0"
                    >
                        {syllabus.name}
                    </Box>
                    <Typography
                        className={classes.lesson}
                        marginTop="auto"
                    >
                        {`${syllabus.countStudents} active students - ${syllabus.countTutors} tutors.`}
                    </Typography>
                    <Typography
                        className={classes.lesson}
                        marginTop="auto"
                    >
                        {`${syllabus.totalLessons} total lessons in ${syllabus.totalLessons / 3} weeks.`}
                    </Typography>
                </Box>
                <Box
                    fontSize="1rem"
                    fontWeight="600"
                    marginLeft="auto"
                >
                    <ReactNumberFormat
                        displayType="text"
                        value={getPrice(syllabus) || 0}
                        thousandSeparator={true}
                        suffix=" ₫"
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default SmallSyllabusCard;