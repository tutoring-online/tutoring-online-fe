import { useEffect, useState } from "react";
//MUI
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

//Core component
import Table from "components/Table/Table.jsx";
import NoInformation from "components/Text/NoInformation";
import ReactNumberFormat from 'react-number-format';
import EastIcon from '@mui/icons-material/East';
//Hooks
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";

//Helpers
import { renderPaymentStatus } from "settings/payment-setting";
import { PAYMENT_STATUSES } from "settings/payment-setting";
import { useHistory } from "react-router-dom";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}


const Payment = () => {
	const history = useHistory();
	const [filter] = useState({
		status: PAYMENT_STATUSES.PAID
	});
	const {
		paymentList,
		loading,
	} = useFilteredPaymentList(filter);

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		setColumns([
			{
				key: "syllabusName",
				label: "Syllabus",
				render: (row) => row.syllabus?.name || <NoInformation text="Syllabus doesn't exist." />
			},
			{
				key: "price",
				label: "Cost",
				render: (row) => (
					<ReactNumberFormat
						displayType="text"
						value={getPrice(row.syllabus) || 0}
						thousandSeparator={true}
						suffix=" ₫"
					/>
				)
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderPaymentStatus(row.status)
			},

		])
	}, [])


	const renderPanel = () => (
		<Box
			display="flex"
			flexFlow="row nowrap"
			alignItems="center"
			columnGap="0.5rem"
		>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={() => {
					history.push(getFullPath(ROUTES.tutor))
				}}
				startIcon={<EastIcon fontSize="medium" />}
			>
				Go to payment Dashboard
			</Button>
		</Box>
	)

	return (
		<>
			<Table
				title={"Bookings waiting to be allocated tutor"}
				columns={columns}
				data={paymentList}
				panel={renderPanel()}
				loadingData={loading}
				noPaging={true}
			/>
		</>
	)
}

export default Payment;