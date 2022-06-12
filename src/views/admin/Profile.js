import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// @mui/icons-material components

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";

// {
//     "type": "signup",
//     "role": "student",
//     "resultCode": 0,
//     "resultMessage": "Success",
//     "data": [
//         {
//             "id": "5",
//             "email": "anhndhse151389@fpt.edu.vn",
//             "name": "Nguyen Dang Hai Anh (K15 HCM)",
//             "grade": 0,
//             "phone": "",
//             "status": 1,
//             "gender": 0,
//             "birthday": "",
//             "address": "",
//             "avatarURL": "https://lh3.googleusercontent.com/a/AATXAJwtkePvLgfpiJzyI0IbUDVlVDN4OesJ243CNZZY=s96-c",
//             "createdDate": "09-06-2022 23:22:53",
//             "updatedDate": ""
//         }
//     ]
// }

const useStyles = makeStyles(componentStyles);


function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        xl={12}
                        component={Box}
                        marginBottom="3rem"
                        classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
                    >
                        <Card
                            classes={{
                                root: classes.cardRoot + " " + classes.cardRootSecondary,
                            }}
                        >
                            <CardHeader
                                subheader={
                                    <Grid
                                        container
                                        component={Box}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs="auto">
                                            <Box
                                                component={Typography}
                                                variant="h3"
                                                marginBottom="0!important"
                                            >
                                                [AdminName] Profile
                                            </Box>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Box
                                                justifyContent="flex-end"
                                                display="flex"
                                                flexWrap="wrap"
                                            />
                                        </Grid>
                                    </Grid>
                                }
                                classes={{ root: classes.cardHeaderRoot }}
                            ></CardHeader>
                            <CardContent>
                                <Box
                                    component={Typography}
                                    variant="h6"
                                    color={theme.palette.gray[600] + "!important"}
                                    paddingTop=".25rem"
                                    paddingBottom=".25rem"
                                    fontSize=".75rem!important"
                                    letterSpacing=".04em"
                                    marginBottom="1.5rem!important"
                                    classes={{ root: classes.typographyRootH6 }}
                                >
                                    User Information
                                </Box>
                                <div className={classes.plLg4}>
                                    <Grid container>
                                        <Grid container item xs={12} lg={8}>
                                            <Grid item xs={12} lg={9}>
                                                <FormGroup>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl
                                                        variant="filled"
                                                        component={Box}
                                                        width="100%"
                                                        marginBottom="1rem!important"
                                                    >
                                                        <Box
                                                            paddingLeft="0.75rem"
                                                            paddingRight="0.75rem"
                                                            component={FilledInput}
                                                            autoComplete="off"
                                                            type="email"
                                                            defaultValue="linhse111111@fu.vn"
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </FormGroup>
                                            </Grid>
                                            <Grid item xs={12} lg={9}>
                                                <FormGroup>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl
                                                        variant="filled"
                                                        component={Box}
                                                        width="100%"
                                                        marginBottom="1rem!important"
                                                    >
                                                        <Box
                                                            paddingLeft="0.75rem"
                                                            paddingRight="0.75rem"
                                                            component={FilledInput}
                                                            autoComplete="off"
                                                            type="text"
                                                            defaultValue="Linh"
                                                        />
                                                    </FormControl>
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={6} lg={3}>
                                            <Grid>
                                                <Box width='250px'
                                                    height='250px'
                                                    component={Card}
                                                    image="true" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <RadioGroup row>
                                                        <FormControlLabel
                                                            value="male"
                                                            control={<Radio />}
                                                            label="Male"
                                                            defaultChecked="true"
                                                        />
                                                        <FormControlLabel
                                                            value="female"
                                                            control={<Radio />}
                                                            label="Female"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Birthday</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="date"
                                                        defaultValue="2003-02-01"
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="text"
                                                        defaultValue="0123456789"
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.plLg4}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="text"
                                                        defaultValue="12 Duong D1, Phuong TT, Quan 9, TP.HCM"
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Avatar URL</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="text"
                                                        defaultValue="Image/Axxx"
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} lg={3}>
                                            <FormGroup>
                                                <FormLabel>Choose Image</FormLabel>
                                                <Button
                                                    variant="contained"
                                                    size="medium"
                                                    classes={{ root: classes.buttonRootInfo }}
                                                >
                                                    Browse...
                                                </Button>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Box
                                    component={Divider}
                                    marginBottom="1.5rem!important"
                                    marginTop="1.5rem!important"
                                />
                                <Box
                                    component={Typography}
                                    variant="h6"
                                    color={theme.palette.gray[600] + "!important"}
                                    paddingTop=".25rem"
                                    paddingBottom=".25rem"
                                    fontSize=".75rem!important"
                                    letterSpacing=".04em"
                                    marginBottom="1.5rem!important"
                                    classes={{ root: classes.typographyRootH6 }}
                                >
                                    Account Information
                                </Box>
                                <div className={classes.plLg4}>
                                    <Grid container>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Create Date</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="date"
                                                        defaultValue="2021-02-01"
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <FormGroup>
                                                <FormLabel>Update Date</FormLabel>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <Box
                                                        paddingLeft="0.75rem"
                                                        paddingRight="0.75rem"
                                                        component={FilledInput}
                                                        autoComplete="off"
                                                        type="date"
                                                        defaultValue="2022-05-30"
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Profile;
