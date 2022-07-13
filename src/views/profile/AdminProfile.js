import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
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
import NoInformation from "components/Text/NoInformation";

import componentStyles from "assets/theme/views/admin/profile.js";
import { useSelector } from "react-redux";
import EditButton from "components/Buttons/EditButton";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import { convertNumberToGender } from "settings/setting";

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

  const authState = useSelector((state) => state.auth);
  const admin = authState.user;

  const [isEditing, setIsEditing] = useState(false);

  const enableEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    // reset();
  };

  const basicDisplay = () => (
    <div className={classes.plLg4}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <Box
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.name || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
        <Grid item xs={12} lg={6} maxHeight="103px">
          <FormGroup>
            <FormLabel>Gender</FormLabel>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <Box
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {convertNumberToGender(admin.gender) || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={6} maxHeight="103px">
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <Box
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.email || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>

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
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.birthday || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );

  const contactDisplay = () => (
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
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.address || <NoInformation />}
                </Box>
              </Box>
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
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.phone || <NoInformation />}
                </Box>
              </Box>
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
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.avatarURL || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );

  const accInfoDisplay = () => (
    <div className={classes.plLg4}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <FormGroup>
            <FormLabel>Created Date</FormLabel>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <Box
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.createdDate || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormGroup>
            <FormLabel>Updated Date</FormLabel>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <Box
                display="flex"
                fontFamily="inherit"
                height={43}
                boxShadow="1px"
                alignItems="center"
                backgroundColor="#f7f7f7"
                borderRadius="0.375rem"
                type="text"
                paddingLeft="10px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="400"
                  width="100%"
                  paddingLeft="14px"
                >
                  {admin?.updatedDate || <NoInformation />}
                </Box>
              </Box>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Container
        maxWidth={false}
        component={Box}
        marginTop="15rem"
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
                  <Grid>
                    {isEditing ? (
                      <>
                        <SubmitButton onClick={cancelEdit} />
                      </>
                    ) : (
                      <>
                        <EditButton onClick={enableEdit} />
                      </>
                    )}
                  </Grid>
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
                  style={{ backgroundColor: "#e6e6e6" }}
                    
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
                  ></CardHeader>
                  <CardContent style={{ backgroundColor: "#ffffff" }}>
                    {isEditing ? (
                      <div className={classes.plLg4}>
                        <Grid container>
                          <Grid item xs={12} lg={6}>
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
                                  defaultValue={
                                    admin?.name || <NoInformation />
                                  }
                                />
                              </FormControl>
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12} lg={6} maxHeight="103px">
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
                          <Grid item xs={12} lg={6} maxHeight="103px">
                            <FormGroup>
                              <FormLabel>Email</FormLabel>
                              <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                              >
                                <Box
                                  display="flex"
                                  fontFamily="inherit"
                                  height={43}
                                  boxShadow="1px"
                                  alignItems="center"
                                  backgroundColor="#f7f7f7"
                                  borderRadius="0.375rem"
                                  type="text"
                                  paddingLeft="10px"
                                >
                                  <Box
                                    fontSize="14px"
                                    fontWeight="400"
                                    width="100%"
                                    paddingLeft="14px"
                                  >
                                    {admin?.email || <NoInformation />}
                                  </Box>
                                </Box>
                              </FormControl>
                            </FormGroup>
                          </Grid>
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
                    ) : (
                      basicDisplay()
                    )}
                  </CardContent>
                </Card>

                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                  style={{ marginBottom: "1rem" }}
                >
                  <CardHeader
                  style={{ backgroundColor: "#e6e6e6" }}
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
                  ></CardHeader>
                  <CardContent style={{ backgroundColor: "#ffffff" }}>
                    {isEditing ? (
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
                                  defaultValue={admin?.address || ""}
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
                                  defaultValue={admin?.phone || ""}
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
                                  defaultValue={admin?.avatarURL || ""}
                                />
                              </FormControl>
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      contactDisplay()
                    )}
                  </CardContent>
                </Card>
                <Card
                  classes={{
                    root: classes.cardRoot + " " + classes.cardRootSecondary,
                  }}
                  style={{ marginBottom: "1rem" }}
                >
                  <CardHeader
                  style={{ backgroundColor: "#e6e6e6" }}
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
                  ></CardHeader>
                  <CardContent style={{ backgroundColor: "#ffffff" }}>
                    {isEditing ? (
                      <div className={classes.plLg4}>
                        <Grid container>
                          <Grid item xs={12} lg={6}>
                            <FormGroup>
                              <FormLabel>Created Date</FormLabel>
                              <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                              >
                                <Box
                                  display="flex"
                                  fontFamily="inherit"
                                  height={43}
                                  boxShadow="1px"
                                  alignItems="center"
                                  backgroundColor="#f7f7f7"
                                  borderRadius="0.375rem"
                                  type="text"
                                  paddingLeft="10px"
                                >
                                  <Box
                                    fontSize="14px"
                                    fontWeight="400"
                                    width="100%"
                                    paddingLeft="14px"
                                  >
                                    {admin?.createdDate || <NoInformation />}
                                  </Box>
                                </Box>
                              </FormControl>
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <FormGroup>
                              <FormLabel>Updated Date</FormLabel>
                              <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                              >
                                <Box
                                  display="flex"
                                  fontFamily="inherit"
                                  height={43}
                                  boxShadow="1px"
                                  alignItems="center"
                                  backgroundColor="#f7f7f7"
                                  borderRadius="0.375rem"
                                  type="text"
                                  paddingLeft="10px"
                                >
                                  <Box
                                    fontSize="14px"
                                    fontWeight="400"
                                    width="100%"
                                    paddingLeft="14px"
                                  >
                                    {admin?.updatedDate || <NoInformation />}
                                  </Box>
                                </Box>
                              </FormControl>
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      accInfoDisplay()
                    )}
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
