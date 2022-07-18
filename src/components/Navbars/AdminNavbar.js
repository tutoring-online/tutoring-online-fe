import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @mui
import makeStyles from '@mui/styles/makeStyles';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

// core components
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";

//Helper
import componentStyles from "assets/theme/components/admin-navbar.js";
import componentStylesAuth from "assets/theme/components/auth-navbar.js";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import { isAvailableArray } from "helpers/arrayUtils";

const useStyles = makeStyles(componentStyles);
const useStylesAuth = makeStyles(componentStylesAuth);

export default function AdminNavbar({ brandText }) {
	const classes = useStyles();
	const classesAuth = useStylesAuth();

	const [listItem, setListItem] = useState([]);

	useEffect(() => {
		const list = [
			{
				key: "home",
				to: getFullPath(ROUTES.home),
				label: "Home",
				icon: HomeIcon
			},
		];
		setListItem(() => list.filter(item => Boolean(item)));
	}, [])

	return (
		<>
			<AppBar
				position="absolute"
				color="transparent"
				elevation={0}
				classes={{ root: classes.appBarRoot }}
			>
				<Toolbar disableGutters>
					<Container
						maxWidth={false}
						component={Box}
						classes={{ root: classes.containerRoot }}
					>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							width="100%"
							marginTop="0.5rem"
						>
							<div>
								<Typography
									className={classes.brandTitle}
									variant="h4"
									component="a"
								>
									{brandText}
								</Typography>
							</div>
							<Box display="flex" alignItems="center" width="auto">
								<Box
									display="flex"
									alignItems="center"
									component={List}
									className={classesAuth.flexDirectionColumn}
								>
									{isAvailableArray(listItem) && listItem.map((item, index) =>
										<ListItem
											key={item.key || index}
											component={Link}
											to={item.to}
											classes={{
												root: classesAuth.listItemRoot,
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: "0",
													color: "#fff",
													marginRight: ".5rem!important"
												}}
											>
												<item.icon
													sx={{
														width: "1.25rem!important",
														height: "1.25rem!important",
													}}
												/>
											</ListItemIcon>
											<ListItemText
												primary={item.label || "N/A"}
												primaryTypographyProps={{
													style: { whiteSpace: "nowrap" }
												}}
											/>
										</ListItem>
									)}
								</Box>
								<NavbarDropdown />
							</Box>
						</Box>
					</Container>
				</Toolbar>
			</AppBar>
		</>
	);
}
