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
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { toast } from 'react-toastify';
// @mui/icons-material components

// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useSelector } from "react-redux";

import componentStyles from "assets/theme/views/admin/profile.js";
import useAuthActions from "hooks/auth/useAuthActions";

const useStyles = makeStyles(componentStyles);

function TutorProfile() {
  const classes = useStyles();
  const theme = useTheme();

  const Input = styled("input")({
    display: "none",
  });

  const user = useSelector((state) => state.auth.user);
  const actions = useAuthActions();  

  var nameInput = user.name;
  const nameInputOnchange = (event) => {
    nameInput = event.target.value;
  }

  var birthdayInput = "";
  const birthdayInputOnchange = (event) => {
    birthdayInput = event.target.value;
  }

  var genderInput = user.gender;
  const handleGenderOnchange = (event) => {    
    genderInput = event.target.value
  }

  var desInput = user.description;
  const descriptionInputOnchange = (event) => {
    desInput = event.target.value;
  }

  var phoneInput = user.phone;
  const phoneInputOnchange = (event) => {
    phoneInput = event.target.value;
  }

  var addressInput = user.address;
  const addressInputOnchange = (event) => {
    addressInput = event.target.value;
  }

  var avaURL = user.avatarURL;
  const avaURLOnchange = (event) => {
    avaURL = event.target.value;
  }

  const handleSaveClick = () => {
    //Save Button
    actions.editUser({
      email: `${user?.email}`,
      name: nameInput,
      gender: genderInput,
      description: desInput,
      birthday: birthdayInput,
      phone: phoneInput,
      address: addressInput,
      avatarURL: avaURL,
      createdDate: `${user?.createdDate}`,
      updatedDate: "",
    })
    toast.success("Save Profile successfully.");
  }  

  

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
                        [Tutor] Profile
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
                              defaultValue={`${user?.email || "N/A"}`}
                              disabled="true"
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
                              onChange={nameInputOnchange}
                              defaultValue={`${user?.name || "N/A"}`}
                            />
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={3}>
                      <Grid>
                        <Box
                          width="250px"
                          height="250px"
                          component={Card}
                          marginLeft="1rem"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container marginTop="1rem">
                    <Grid container item xs={12} lg={8} paddingLeft="1rem">
                      <Grid item xs={12} lg={9}>
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
                                value="0"
                                name="gender"
                                control={<Radio />}
                                label="Male"
                                checked={ `${user?.gender}` === "0"}
                                onChange={handleGenderOnchange}
                              />
                              <FormControlLabel
                                value="1"
                                name="gender"
                                control={<Radio />}
                                label="Female"
                                checked={ `${user?.gender}` === "1"}
                                onChange={handleGenderOnchange}
                              />
                            </RadioGroup>
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3} paddingLeft="6rem">
                      <FormGroup>
                        <FormLabel>Choose Image</FormLabel>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <label htmlFor="contained-button-file">
                            <Input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              type="file"
                            />
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </Stack>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={12}>
                      <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          height="100%"
                          marginBottom="1rem!important"
                          maxHeight="500px"
                          overflow="auto"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            multiline="true"
                            autoComplete="off"
                            type="text"
                            placeholder="Tutor Description"
                            onChange={descriptionInputOnchange}
                            defaultValue={`${user?.description || "N/A"}`}
                          />
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
                            onChange={birthdayInputOnchange}
                            defaultValue={`${user?.birthday || "N/A"}`}
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
                            onChange={phoneInputOnchange}
                            defaultValue={`${user?.phone || "N/A"}`}
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
                            onChange={addressInputOnchange}
                            defaultValue={`${user?.address || "N/A"}`}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container></Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Meet URL:</FormLabel>
                        <Box
                          paddingLeft="0.75rem"
                          paddingRight="0.75rem"
                          component={FilledInput}
                          autoComplete="off"
                          type="text"
                          placeholder="MeetURL"
                          defaultValue={`${user?.meetURL || "N/A"}`}
                        />
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
                            onChange={avaURLOnchange}
                            defaultValue={`${user?.avatarURL || "N/A"}`}
                          />
                        </FormControl>
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
                            type="datetime"
                            defaultValue={`${user?.createdDate || "N/A"}`}
                            disabled="true"
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
                            type="datetime"
                            defaultValue={`${user?.updatedDate || "N/A"}`}
                            disabled="true"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Button onClick={handleSaveClick} variant="contained">
                      Save TEST
                    </Button>
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

export default TutorProfile;
