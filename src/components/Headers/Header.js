import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// @mui/icons-material components
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import GroupAdd from "@mui/icons-material/GroupAdd";
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";

// core components
import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const Header = () => {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<>
			<div className={classes.header}>
				<Container
					maxWidth={false}
					component={Box}
					classes={{ root: classes.containerRoot }}
				>
					<div>
						<Grid container>
							<Grid item xl={3} lg={6} xs={12}>
								<CardStats
									subtitle="Traffic"
									title="350,897"
									icon={InsertChartOutlined}
									color="bgError"
									footer={
										<>
											<Box
												component="span"
												fontSize=".875rem"
												color={theme.palette.success.main}
												marginRight=".5rem"
												display="flex"
												alignItems="center"
											>
												<Box
													component={ArrowUpward}
													width="1.5rem!important"
													height="1.5rem!important"
												/>{" "}
												3.48%
											</Box>
											<Box component="span" whiteSpace="nowrap">
												Since last month
											</Box>
										</>
									}
								/>
							</Grid>
							<Grid item xl={3} lg={6} xs={12}>
								<CardStats
									subtitle="New users"
									title="2,356"
									icon={PieChart}
									color="bgWarning"
									footer={
										<>
											<Box
												component="span"
												fontSize=".875rem"
												color={theme.palette.error.main}
												marginRight=".5rem"
												display="flex"
												alignItems="center"
											>
												<Box
													component={ArrowDownward}
													width="1.5rem!important"
													height="1.5rem!important"
												/>{" "}
												3.48%
											</Box>
											<Box component="span" whiteSpace="nowrap">
												Since last week
											</Box>
										</>
									}
								/>
							</Grid>
							<Grid item xl={3} lg={6} xs={12}>
								<CardStats
									subtitle="Sales"
									title="924"
									icon={GroupAdd}
									color="bgWarningLight"
									footer={
										<>
											<Box
												component="span"
												fontSize=".875rem"
												color={theme.palette.warning.main}
												marginRight=".5rem"
												display="flex"
												alignItems="center"
											>
												<Box
													component={ArrowDownward}
													width="1.5rem!important"
													height="1.5rem!important"
												/>{" "}
												1.10%
											</Box>
											<Box component="span" whiteSpace="nowrap">
												Since yesterday
											</Box>
										</>
									}
								/>
							</Grid>
							<Grid item xl={3} lg={6} xs={12}>
								<CardStats
									subtitle="Performance"
									title="49,65%"
									icon={EmojiEvents}
									color="bgInfo"
									footer={
										<>
											<Box
												component="span"
												fontSize=".875rem"
												color={theme.palette.success.main}
												marginRight=".5rem"
												display="flex"
												alignItems="center"
											>
												<Box
													component={ArrowUpward}
													width="1.5rem!important"
													height="1.5rem!important"
												/>{" "}
												10%
											</Box>
											<Box component="span" whiteSpace="nowrap">
												Since last month
											</Box>
										</>
									}
								/>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Header;
