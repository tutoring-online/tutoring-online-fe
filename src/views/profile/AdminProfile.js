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
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import { List, ListItem, ListItemButton } from "@mui/material";

// @mui/icons-material components
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import AttachmentRoundedIcon from "@mui/icons-material/AttachmentRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

// core components
import NoInformation from "components/Text/NoInformation";

import componentStyles from "assets/theme/views/admin/profile.js";
import { useSelector } from "react-redux";
import { convertNumberToGender } from "settings/setting";

const useStyles = makeStyles(componentStyles);

export default function AdminProfile() {
  const classes = useStyles();

  const authState = useSelector((state) => state.auth);
  const admin = authState.user;

  const [isBasicEditing, setIsBasicEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);

  const enableBasicEdit = () => {
    setIsBasicEditing(true);
  };
  const enableContactEdit = () => {
    setIsContactEditing(true);
  };

  const cancelBasicEdit = () => {
    setIsBasicEditing(false);
    // reset();
  };

  const cancelContactEdit = () => {
    setIsContactEditing(false);
    // reset();
  };

  const setAllCancel = () => {
    setIsContactEditing(false);
    setIsBasicEditing(false);
    // reset();
  };
  

  const basicDisplay = () => (
    <div className={classes.plLg4}>
      <Grid container>
        <Grid item xs={12} lg={6} alignContent="center" alignItems="center">
          <Grid container>
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <BadgeRoundedIcon style={{ width: "100%", height: "100%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" alignItems="center" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Name" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="6px"
                      >
                        {admin?.name || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container marginTop="1rem">
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <EmailRoundedIcon style={{ width: "100%", height: "100%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" alignItems="center" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Email" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="7px"
                      >
                        {admin?.email || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container marginTop="1rem">
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <CelebrationRoundedIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" alignItems="center" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Birthday" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="7px"
                      >
                        {admin?.birthday || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container marginTop="1rem">
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <TransgenderRoundedIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" alignItems="center" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Gender" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="7px"
                      >
                        {convertNumberToGender(admin?.gender) || (
                          <NoInformation />
                        )}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container item xs={12} lg={12} borderLeft="1px solid #e6e6e6">
            <Grid paddingLeft="7rem">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="2rem 2rem"
              >
                <Avatar
                  src={admin?.avatarURL}
                  alt="avatar"
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  const contactDisplay = () => (
    <div className={classes.plLg4}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Grid container>
            <Grid item xs={12} lg={0.75} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <HomeRoundedIcon style={{ width: "100%", height: "100%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Address" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="7px"
                      >
                        {admin?.address || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} marginTop="1rem">
          <Grid container>
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <PhoneAndroidRoundedIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Phone Number" placement="right">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        width="100%"
                        paddingBottom="7px"
                      >
                        {admin?.phone || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} marginTop="1rem">
          <Grid container>
            <Grid item xs={12} lg={1.5} paddingLeft="2rem" paddingTop="6px">
              <Box width={20} height={20}>
                <AttachmentRoundedIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box style={{ width: "100%", height: "40px" }}>
                <Box display="flex" height="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor="#fff"
                  >
                    <Tooltip title="Avatar URL" placement="top">
                      <Box
                        fontFamily="san-serif"
                        fontWeight={500}
                        fontSize="14px"
                        paddingBottom={1.5}
                        maxWidth="20rem"
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {admin?.avatarURL || <NoInformation />}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
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
            marginLeft="-3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Grid container>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    borderRadius: "5px"
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              Dashboard
                            </Typography>
                          }
                        />
                      </ListItemButton>

                      <Divider />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={setAllCancel}>
                        <ListItemIcon>
                          <PersonRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              My Profile
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              Settings
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <EventNoteRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              Activity
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LiveHelpRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              Support
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: "-30px" }}
                          secondary={
                            <Typography
                              type="body2"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                color: "red",
                              }}
                            >
                              Log out
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} lg={9} marginLeft="1rem">
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
                        <Grid item xs="auto" lg={2}>
                          <Box
                            component={Typography}
                            variant="h3"
                            marginBottom="0!important"
                          >
                            Basic Info
                          </Box>
                        </Grid>
                        <Grid item lg={8}></Grid>
                        <Grid item lg={2} paddingLeft="4rem">
                          {isBasicEditing ? (
                            <div></div>
                          ) : (
                            <Tooltip title="Edit" placement="left">
                              <Box
                                component={Button}
                                onClick={enableBasicEdit}
                                width="50%"
                                height="100%"
                              >
                                <BorderColorRoundedIcon />
                              </Box>
                            </Tooltip>
                          )}
                        </Grid>
                      </Grid>
                    }
                  ></CardHeader>
                  <CardContent
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                    }}
                  >
                    {isBasicEditing ? (
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
                        <Grid container item xs="auto">
                          <Grid item xs="auto" lg={8}></Grid>
                          <Grid item xs="auto" lg={2}>
                            <Box
                              variant="contained"
                              width="100%"
                              height="100%"
                              marginLeft="2rem"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth="true"
                                startIcon={<SaveRoundedIcon />}
                                onClick={cancelBasicEdit}
                              >
                                Save
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item xs="auto" lg={2}>
                            <Box
                              variant="contained"
                              width="100%"
                              height="100%"
                              marginLeft="1rem"
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                fullWidth="true"
                                startIcon={<CancelRoundedIcon />}
                                onClick={cancelBasicEdit}
                              >
                                Cancel
                              </Button>
                            </Box>
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
                        <Grid item xs="auto" lg={2}>
                          <Box
                            component={Typography}
                            variant="h3"
                            marginBottom="0!important"
                          >
                            Contact
                          </Box>
                        </Grid>
                        <Grid item xs="auto" lg={8}></Grid>
                        <Grid item xs="auto" lg={2} paddingLeft="4rem">
                          {isContactEditing ? (
                            <div></div>
                          ) : (
                            <Tooltip title="Edit" placement="left">
                              <Box
                                component={Button}
                                onClick={enableContactEdit}
                                width="50%"
                                height="100%"
                              >
                                <BorderColorRoundedIcon />
                              </Box>
                            </Tooltip>
                          )}
                        </Grid>
                      </Grid>
                    }
                  ></CardHeader>
                  <CardContent
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                    }}
                  >
                    {isContactEditing ? (
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
                        <Grid container item xs="auto">
                          <Grid item xs="auto" lg={8}></Grid>
                          <Grid item xs="auto" lg={2}>
                            <Box
                              variant="contained"
                              width="100%"
                              height="100%"
                              marginLeft="2rem"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth="true"
                                startIcon={<SaveRoundedIcon />}
                                onClick={cancelContactEdit}
                              >
                                Save
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item xs="auto" lg={2}>
                            <Box
                              variant="contained"
                              width="100%"
                              height="100%"
                              marginLeft="1rem"
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                fullWidth="true"
                                startIcon={<CancelRoundedIcon />}
                                onClick={cancelContactEdit}
                              >
                                Cancel
                              </Button>
                            </Box>
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
                  <CardContent
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                    }}
                  >
                    <div className={classes.plLg4}>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <Grid item xs={12} lg={12}>
                            <FormGroup>
                              <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                              >
                                <Grid container>
                                  <Grid
                                    xs={12}
                                    lg={1.5}
                                    paddingLeft="1rem"
                                    paddingTop="6px"
                                  >
                                    <Box
                                      width={20}
                                      height={20}
                                      paddingLeft="-2rem"
                                    >
                                      <AccessTimeFilledRoundedIcon
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          marginTop: "5px",
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid xs={12} lg={10}>
                                    <Box
                                      display="flex"
                                      fontFamily="inherit"
                                      height={43}
                                      boxShadow="1px"
                                      alignItems="center"
                                      backgroundColor="#fff"
                                      borderRadius="0.375rem"
                                      type="text"
                                      width="50%"
                                      marginLeft={-1}
                                    >
                                      <Tooltip
                                        title="Created Date"
                                        placement="right"
                                      >
                                        <Box
                                          fontFamily="sans-serif"
                                          fontSize="14px"
                                          fontWeight="400"
                                          width="100%"
                                          paddingLeft="10px"
                                        >
                                          {admin?.createdDate || (
                                            <NoInformation />
                                          )}
                                        </Box>
                                      </Tooltip>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </FormControl>
                            </FormGroup>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Grid item xs={12} lg={12} paddingLeft="3rem">
                            <FormGroup>
                              <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                              >
                                <Grid container>
                                  <Grid
                                    xs={12}
                                    lg={1.5}
                                    paddingLeft="1rem"
                                    paddingTop="6px"
                                  >
                                    <Box width={20} height={20}>
                                      <AccessTimeFilledRoundedIcon
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          marginLeft: "-2rem",
                                          marginTop: "5px",
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid xs={12} lg={10}>
                                    <Box
                                      display="flex"
                                      fontFamily="inherit"
                                      height={43}
                                      boxShadow="1px"
                                      alignItems="center"
                                      backgroundColor="#fff"
                                      borderRadius="0.375rem"
                                      type="text"
                                      width="100%"
                                      marginLeft={-3}
                                    >
                                      <Tooltip
                                        title="Updated Date"
                                        placement="right"
                                      >
                                        <Box
                                          fontFamily="sans-serif"
                                          fontSize="14px"
                                          fontWeight="400"
                                          width="50%"
                                        >
                                          {admin?.updatedDate || (
                                            <NoInformation />
                                          )}
                                        </Box>
                                      </Tooltip>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </FormControl>
                            </FormGroup>
                          </Grid>
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
