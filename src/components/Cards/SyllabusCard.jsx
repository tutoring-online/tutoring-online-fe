import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import componentStyles from 'assets/theme/components/syllabus-card.js';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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


const StatisticItem = ({ icon, content, classes }) => (
    <ListItem
        disablePadding
        sx={{
            display: "flex",
        }}
    >
        <ListItemIcon
            sx={{
                minWidth: "0px",
                marginRight: "8px"
            }}
        >
            {icon}
        </ListItemIcon>
        <ListItemText
            primary={content}
            primaryTypographyProps={{ className: classes.lesson }}
        />
    </ListItem>
)

export const SyllabusCard = ({
    syllabus
}) => {
    const styles = useStyles();
    const classes = useStylesEllipsis();
    
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
                        className={classes.multiLineEllipsis}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus. Tquam beatae rerum inventore consectetur, neque doloribus. Quam beatae rerum inventore consectetur, neque doloribus.
                    </Typography>

                    <Typography
                        className={classes.lesson}
                        marginTop="auto"
                    >
                        {`${syllabus.countStudents} active students - ${syllabus.countTutors} tutors.`}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow="1"
                    minWidth="fit-content"
                    marginLeft="1rem"
                    width="100%"
                >
                    <List>
                        <StatisticItem
                            icon={<ListAltIcon />}
                            content={`${syllabus.totalLessons} total lessons`}
                            classes={classes}
                        />
                        <StatisticItem
                            icon={<AccessTimeIcon />}
                            content={`${syllabus.totalLessons / 3} weeks`}
                            classes={classes}
                        />
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={() => { }}
                    >
                        Book the course
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default SyllabusCard;