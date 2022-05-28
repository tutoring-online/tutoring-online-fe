import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
// @mui/icons-material components
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import School from "@mui/icons-material/School";

// core components
import componentStyles from "assets/theme/views/auth/register.js";

const useStyles = makeStyles(componentStyles);

function Register() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize="80%"
                fontWeight="400"
                component="small"
                color={theme.palette.gray[600]}
              >
                Sign up with
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
            subheader={
              <Box textAlign="center">
                <Box
                  component={Button}
                  variant="contained"
                  marginRight="2rem!important"
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component="span" marginRight="4px">
                    <Box
                      alt="..."
                      component="img"
                      width="20px"
                      className={classes.buttonImg}
                      src={
                        require("assets/img/icons/common/github.svg").default
                      }
                    ></Box>
                  </Box>
                  <Box component="span" marginLeft=".75rem">
                    Github
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component="span" marginRight="4px">
                    <Box
                      alt="..."
                      component="img"
                      width="20px"
                      className={classes.buttonImg}
                      src={
                        require("assets/img/icons/common/google.svg").default
                      }
                    ></Box>
                  </Box>
                  <Box component="span" marginLeft=".75rem">
                    Google
                  </Box>
                </Button>
              </Box>
            }
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1.5rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Or sign up with credentials
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Name"
                startAdornment={
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              fontStyle="italic"
              fontSize="1rem"
              color={theme.palette.gray[600]}
              marginBottom=".5rem"
            >
              <Box component="small" fontSize="80%">
                password strength:{" "}
                <Box
                  component="span"
                  fontWeight="700"
                  color={theme.palette.success.main}
                >
                  strong
                </Box>
              </Box>
            </Box>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={
                <>
                  I agree with the{" "}
                  <Box
                    color={theme.palette.primary.main}
                    component="a"
                    textDecoration="none"
                  >
                    Privacy Policy
                  </Box>
                </>
              }
              labelPlacement="end"
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained">
                Create account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Register;
