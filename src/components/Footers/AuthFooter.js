import React from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// core components
import componentStyles from "assets/theme/components/auth-footer.js";

const useStyles = makeStyles(componentStyles);

const Footer = () => {
    const classes = useStyles();
    return (
        <Box component="footer" width="100%" paddingTop="1rem">
            <Container
                component={Box}
                maxWidth="xl"
                display="flex!important"
                alignItems="center"
                classes={{
                    root:
                        classes.justifyContentCenter + " " + classes.flexDirectionColumn,
                }}
            >
                <Grid item xs={12} xl={6}>
                    <div className={classes.copyrightWrapper}>
                        © {new Date().getFullYear()}{" "}
                        <a
                            className={classes.copyrightLink}
                            href="https://www.creative-tim.com?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            NTA Team
                        </a>
                    </div>
                </Grid>

                <Grid
                    item
                    xs={12}
                    xl={6}
                    component={Box}
                    display="flex"
                    justifyContent="flex-end"
                    classes={{
                        root:
                            classes.justifyContentCenter + " " + classes.flexDirectionColumn,
                    }}
                >
                    <Box
                        component={List}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        classes={{
                            root:
                                classes.justifyContentCenter +
                                " " +
                                classes.flexDirectionColumn,
                        }}
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
                            About Us
                        </ListItem>

                        <ListItem
                            component="a"
                            href="https://github.com/tutoring-online/tutoring-online-docs"
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
            </Container>
        </Box>
    );
};

export default Footer;
