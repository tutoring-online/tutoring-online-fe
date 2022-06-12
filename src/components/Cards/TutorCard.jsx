import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import componentStyles from 'assets/theme/components/tutor-card.js';
import { Typography } from '@mui/material';

const useStyles = makeStyles(componentStyles);

export const TutorCard = () => {
    const styles = useStyles();

    return (
        <Card className={cx(styles.root)}>
            <CardMedia
                className={styles.media}
                image={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
                }
            />
            <CardContent className={styles.content}>
                <Typography variant="body2" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus. Tquam beatae rerum inventore consectetur,
                    neque doloribus.
                    quam beatae rerum inventore consectetur,
                    neque doloribus
                </Typography>
                <Button>Read more</Button>
            </CardContent>
        </Card>
    );
}

export default TutorCard;