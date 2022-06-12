import React from 'react';
import cx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: "100%",
        borderRadius: 12,
        padding: 12,
    },
    media: {
        height: "200px",
        width: "100%",
        borderRadius: 6,
    },
}));

export const TutorSchedule = React.memo(function MusicCard() {
    const styles = useStyles();

    return (
        <Card className={cx(styles.root)}>
            <CardMedia
                component="img"
                alt="..."
                className={cx(styles.media)}
                image={
                    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
                }
            />
            <CardContent>
                <Typography variant="body2" gutterBottom>
                    Sed ut perspiciatis, unde omnis iste natu
                    s error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque
                    ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
                    Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequ
                    untur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui
                    dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] e
                    ius modi tempora inci[di]dunt, u
                </Typography>
            </CardContent>
        </Card>
    );
});

export default TutorSchedule;