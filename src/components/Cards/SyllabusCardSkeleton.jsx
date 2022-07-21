import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import componentStyles from 'assets/theme/components/syllabus-card.js';
import { List, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles(componentStyles);


const SyllabusCardSkeleton = () => {
    const styles = useStyles();

    return (
        <Card
            className={cx(styles.root)}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                backgroundColor: "#fff",
                width: "100%"
            }}
            component="div"
        >
            <CardMedia
                className={styles.media}
                sx={{
                    height: "100%"
                }}
            >
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height="140px"
                />
            </CardMedia>
            <CardContent className={styles.content}>
                <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                >
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={200}
                        height={20}
                        style={{ marginBottom: "0.5rem" }}
                    />
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={50}
                        style={{ marginBottom: "0.5rem" }}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        height={30}
                    />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow="1"
                    minWidth="fit-content"
                    marginLeft="1rem"
                    width="240px"
                >
                    <Box
                        fontSize="1rem"
                        fontWeight="600"
                        margin="0 auto"
                        width="100%"
                    >
                        <Skeleton
                            variant="text"
                            animation="wave"
                            height={30}
                        />
                    </Box>
                    <List>
                        <Skeleton
                            variant="text"
                            animation="wave"
                            height={30}
                        />
                        <Skeleton
                            variant="text"
                            animation="wave"
                            height={30}
                        />
                    </List>
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={30}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default SyllabusCardSkeleton;