import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// @mui/icons-material components
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import GroupAdd from "@mui/icons-material/GroupAdd";
import ReactNumberFormat from 'react-number-format';
// core components
import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";
import { getFirstDayOfMonth } from "helpers/dateUtils";
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";
import { isAvailableArray } from "helpers/arrayUtils";
import { Skeleton } from "@mui/material";
import { formatDate } from "helpers/dateUtils";
import { isoFormat } from "helpers/dateUtils";
import { PAYMENT_STATUSES } from "settings/payment-setting";
import { STUDENT_STATUSES } from "settings/student-setting";
import useFilteredStudentList from "hooks/student/useFilteredStudentList";

const useStyles = makeStyles(componentStyles);

const firstDayOfMonthString = formatDate(getFirstDayOfMonth(), isoFormat);

const paymentFilter = {
	FromCreatedDate: firstDayOfMonthString,
}

const studentFilter = {
	FromCreatedDate: firstDayOfMonthString,
	Status: STUDENT_STATUSES.ACTIVE
}

const Header = () => {
	const classes = useStyles();

	const { paymentList, loading: loadingPayments } = useFilteredPaymentList(paymentFilter);
	const { studentList, loading: loadingStudents } = useFilteredStudentList(studentFilter);

	const [loadingStatistic, setLoadingStatistic] = useState([]);
	const [statistic, setStatistic] = useState({});

	console.log(studentList);
	useEffect(() => {
		let revenue = 0.0;
		let newBooking = 0;
		if (isAvailableArray(paymentList)) {
			paymentList.forEach(item => {
				newBooking += 1;
				if (item.status === PAYMENT_STATUSES.PAID) {
					revenue += (item.syllabus.price || 0);
				}
			})
		}

		let newStudent = 0;
		if (isAvailableArray(studentList)) {
			newStudent = studentList.length
		}


		setStatistic((prev) => ({
			...prev,
			revenue,
			newStudent,
			newBooking
		}))
	}, [paymentList, studentList])

	useEffect(() => {
		setLoadingStatistic(() =>
			loadingPayments ||
			loadingStudents
		);
	}, [loadingPayments, loadingStudents])



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
							<Grid item xl={4} lg={4} xs={12}>
								<CardStats
									subtitle="Revenue"
									title={loadingStatistic ?
										<Skeleton
											variant="text"
											animation="wave"
											height={30}
										/>
										:
										<ReactNumberFormat
											displayType="text"
											value={statistic.revenue}
											thousandSeparator={true}
											suffix=" ₫"
										/>
									}
									icon={InsertChartOutlined}
									color="bgError"
									footer={
										<>
											<Box component="span" whiteSpace="nowrap">
												Since last month
											</Box>
										</>
									}
								/>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<CardStats
									subtitle="New students"
									title={loadingStatistic ?
										<Skeleton
											variant="text"
											animation="wave"
											height={30}
										/>
										:
										<ReactNumberFormat
											displayType="text"
											value={statistic.newStudent}
											thousandSeparator={true}
										/>
									}
									icon={GroupAdd}
									color="bgWarning"
									footer={
										<>
											<Box component="span" whiteSpace="nowrap">
												Since last month
											</Box>
										</>
									}
								/>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<CardStats
									subtitle="New Booking"
									title={loadingStatistic ?
										<Skeleton
											variant="text"
											animation="wave"
											height={30}
										/>
										:
										<ReactNumberFormat
											displayType="text"
											value={statistic.newBooking}
											thousandSeparator={true}
										/>
									}
									icon={PieChart}
									color="bgError"
									footer={
										<>
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
