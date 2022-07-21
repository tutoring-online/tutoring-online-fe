import React, { useState } from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import componentStyles from 'assets/theme/components/booking-record-card.js';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { renderPaymentStatus } from 'settings/payment-setting';
import { PAYMENT_STATUSES } from 'settings/payment-setting';
import { TeacherIcon } from 'nta-team/nta-icon';
import { MeetingImage } from 'nta-team/nta-img';
import { ResearchImage } from 'nta-team/nta-img';
import { STATUS_COLORS } from 'settings/setting';
// import ReactNumberFormat from 'react-number-format';
// import { getPrice } from 'settings/syllabus-setting';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { CancelPayment } from 'crud/payment';
import { getComboText } from 'settings/payment-setting';
import { getDateSessionText } from 'settings/payment-setting';
import { PayPayment } from 'crud/payment';

const useStyles = makeStyles(componentStyles);
const useStylesEllipsis = makeStyles({
    multiLineEllipsis: {
        // overflow: "hidden",
        // textOverflow: "ellipsis",
        // display: "-webkit-box",
        // "-webkit-line-clamp": 2,
        // "-webkit-box-orient": "vertical",
        textAlign: "justify",
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

export const BookingSyllabusCard = ({
    payment,
    refresh
}) => {
    const styles = useStyles();
    const classes = useStylesEllipsis();

    const [openCancelPayment, setOpenCancelPayment] = useState(false);
    const [openContinuePayment, setOpenContinuePayment] = useState(false);

    const handleOpenCancel = () => {
        setOpenCancelPayment(true);
    }

    const handleCloseCancel = () => {
        setOpenCancelPayment(false);
    }

    const handleOpenContinuePayment = () => {
        setOpenContinuePayment(true);
    }

    const handleCloseContinuePayment = () => {
        setOpenContinuePayment(false);
    }

    const renderButton = () => {
        const status = payment?.status;
        if (status === PAYMENT_STATUSES.ONGOING) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{
                        width: "100%"
                    }}
                    startIcon={
                        <MeetingImage width={20} height={20} />
                    }
                    onClick={() => {
                        const url = payment?.tutor?.meetingUrl;
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                >
                    Go to meeting
                </Button>
            )
        }

        if (status === PAYMENT_STATUSES.PAID) {
            return (
                <Box
                    backgroundColor={STATUS_COLORS.PENDING.bgColor}
                    color="#fff"
                    borderRadius="1rem"
                    padding="0.5rem"

                    display="flex"
                    flexDirection="row"
                >
                    <ResearchImage width={40} height={40} />
                    <Typography
                        fontSize={14}
                        fontWeight="600"
                        marginLeft="0.5rem"
                        color={STATUS_COLORS.PENDING.textColor}
                    >
                        Just a minute, we are looking for the best tutor for you.
                    </Typography>
                </Box>

            )
        }

        if (status === PAYMENT_STATUSES.PENDING) {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ width: "100%" }}
                        startIcon={<CreditCardIcon />}
                        onClick={handleOpenContinuePayment}
                    >
                        Continue payment
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        onClick={handleOpenCancel}
                        sx={{ marginTop: "0.5rem", width: "100%" }}
                        startIcon={<DoDisturbOnIcon />}
                    >
                        Cancel
                    </Button>
                </>
            )
        }
    }

    return (
        <>
            <Card
                className={cx(styles.root)}
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                    backgroundColor: "#fff",
                    width: "100%"
                }}
                component="div"
            >

                <Grid
                    container
                    spacing={1}
                    style={{
                        padding: '0 2rem'
                    }}
                >
                    <Grid item xs={12} md={3}>
                        <CardMedia
                            className={styles.media}
                            image={
                                syllabusImageUrl ||
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            height="100%"
                        >
                            <Box
                                component="h3"
                                margin="0"
                            >
                                {payment?.syllabus.name}
                            </Box>
                            <Typography
                                className={classes.multiLineEllipsis}
                            >
                                {payment?.syllabus.description}
                            </Typography>

                            <Typography
                                className={classes.lesson}
                                marginTop="auto"
                            >
                                {`${getComboText(payment?.combo)} - ${getDateSessionText(payment?.dateSession)}.`}
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{
                                    width: "fit-content",
                                    marginTop: "8px"
                                }}
                                disabled={payment?.status === PAYMENT_STATUSES.CANCELED}
                            >
                                Schedule
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            flexGrow="1"
                            minWidth="fit-content"
                            marginLeft="1rem"
                            width="100%"
                            height="100%"
                        >
                            <Box
                                fontSize="1rem"
                                fontWeight="600"
                                margin="0 auto"
                            >
                                {renderPaymentStatus(payment?.status)}
                            </Box>
                            <List>
                                <StatisticItem
                                    icon={<ListAltIcon />}
                                    content={`${payment?.syllabus.totalLessons} total lessons`}
                                    classes={classes}
                                />
                                <StatisticItem
                                    icon={<AccessTimeIcon />}
                                    content={`${payment?.syllabus.totalLessons / 3} weeks`}
                                    classes={classes}
                                />
                                {payment?.status === PAYMENT_STATUSES.ONGOING &&
                                    <StatisticItem
                                        icon={<TeacherIcon width="14px" height="14px" />}
                                        content={`Tutor Mx. ${payment?.tutor?.name || "N/A"}`}
                                        classes={classes}
                                    />
                                }
                                {payment?.status === PAYMENT_STATUSES.PAID &&
                                    <StatisticItem
                                        icon={<TeacherIcon width="14px" height="14px" />}
                                        content={<b>Searching tutor...</b>}
                                        classes={classes}
                                    />
                                }
                            </List>
                            <Box
                                display="flex"
                                flexDirection="column"
                                width="100%"
                                marginTop="auto"
                            >
                                {renderButton()}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            {openCancelPayment &&
                <CancelPayment
                    open={openCancelPayment}
                    handleClose={handleCloseCancel}
                    payment={payment}
                    refresh={refresh}
                />
            }

            {openContinuePayment &&
                <PayPayment
                    open={openContinuePayment}
                    handleClose={handleCloseContinuePayment}
                    payment={payment}
                    refresh={refresh}
                />
            }
        </>
    );
}

export default BookingSyllabusCard;