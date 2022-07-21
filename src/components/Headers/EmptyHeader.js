import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const EmptyHeader = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.header}>
				<Container
					maxWidth={false}
					component={Box}
					classes={{ root: classes.containerRoot }}
				>
					
				</Container>
			</div>
		</>
	);
};

export default EmptyHeader;
