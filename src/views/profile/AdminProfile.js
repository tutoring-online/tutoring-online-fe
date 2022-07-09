import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
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
import NoInformation from "components/Text/NoInformation";

import componentStyles from "assets/theme/views/admin/profile.js";
import { useSelector } from "react-redux";

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

export default function AdminProfile() {
  const classes = useStyles();
  const theme = useTheme();

  const authState = useSelector((state) => state.auth);
  const admin = authState.user;

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-8rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container width={1200}>
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem"
            marginLeft="-10rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Grid container>
              <Grid xs={6} lg={2}>
                <Box border="1px solid black" height={300}>
                  Admin Profiles
                </Box>
              </Grid>
              <Grid xs={12} lg={9} marginLeft="1rem">
                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                  style={{ marginBottom: "1rem" }}
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
                            Basic Info
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
                    <div className={classes.plLg4}>
                      <Grid container>
                        <Grid item xs={12} lg={12}>
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
                                defaultValue={admin?.name || <NoInformation />}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
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
                                defaultValue={admin?.email || <NoInformation />}
                                disabled={true}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
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
                                defaultValue={
                                  admin?.birthday || <NoInformation />
                                } //!!!
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                  style={{ marginBottom: "1rem" }}
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
                            Contact
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
                                defaultValue={
                                  admin?.address || <NoInformation />
                                }
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </Grid>
                      <Grid container>
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
                                defaultValue={
                                  admin?.phone || "<NoInformation />"
                                }
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
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
                                defaultValue={
                                  admin?.avatarURL || <NoInformation />
                                }
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                  style={{ marginBottom: "1rem" }}
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
                            Account Information
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
                                defaultValue={
                                  admin?.createdDate || <NoInformation />
                                }
                                disabled={true}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <FormGroup>
                            <FormLabel>Update Date!!!</FormLabel>
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
                                defaultValue={
                                  admin?.updatedDate || <NoInformation />
                                }
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
