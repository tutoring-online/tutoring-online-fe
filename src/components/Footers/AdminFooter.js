import React from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// core components
import componentStyles from "assets/theme/components/admin-footer.js";

const useStyles = makeStyles(componentStyles);

const Footer = () => {
    const classes = useStyles();
    return (
        <Box component="footer" width="100%" padding="2.5rem 0">
            <Grid container classes={{ root: classes.justifyContentCenter }}>
                <Box
                    item
                    xs={12}
                    xl={6}
                    component={Grid}
                    display="flex"
                    alignItems="center"
                    className={classes.justifyContentCenter}
                >
                    <div className={classes.copyrightWrapper}>
                        © {new Date().getFullYear()}{" "}
                        <a
                            className={classes.copyrightLink}
                            href="https://github.com/tutoring-online"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            NTA Team
                        </a>
                    </div>
                </Box>

                <Grid
                    item
                    xl={6}
                    component={Box}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Box
                        component={List}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.flexDirectionColumn}
                    >
                        <ListItem
                            component="a"
                            href="https://github.com/tutoring-online"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot,
                            }}
                        >
                            NTA Team
                        </ListItem>

                        <ListItem
                            component="a"
                            href="https://github.com/tutoring-online"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot,
                            }}
                        >
                            About Us
                        </ListItem>

                        <ListItem
                            component="a"
                            href="https://github.com/tutoring-online"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot,
                            }}
                        >
                            Blog
                        </ListItem>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
