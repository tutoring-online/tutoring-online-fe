import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import { LIST_PAYMENT_STATUS } from "settings/payment-setting";
import { PAYMENT_STATUSES } from "settings/payment-setting";
import usePaymentList from "./usePaymentList";

const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",
        icon: InsertChartOutlined,
    },
    pending: {
        ...LIST_PAYMENT_STATUS.find(item => item.value === PAYMENT_STATUSES.PENDING),
        quantity: 0,
        icon: PieChart,
    },
    paid: {
        icon: ErrorIcon,
        ...LIST_PAYMENT_STATUS.find(item => item.value === PAYMENT_STATUSES.PAID),
        quantity: 0,
    },
    ongoing: {
        icon: DirectionsRunIcon,
        ...LIST_PAYMENT_STATUS.find(item => item.value === PAYMENT_STATUSES.ONGOING),
        quantity: 0,
    },
    error: {
        icon: RemoveCircleIcon,
        ...LIST_PAYMENT_STATUS.find(item => item.value === PAYMENT_STATUSES.ERROR),
        quantity: 0,
    },
    canceled: {
        icon: CancelIcon,
        ...LIST_PAYMENT_STATUS.find(item => item.value === PAYMENT_STATUSES.CANCELED),
        quantity: 0,
    }
}

const usePaymentStatistics = () => {
    const {
        paymentList,
        loading,
        refresh
    } = usePaymentList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalPending = 0;
        let totalPaid = 0;
        let totalOnGoing = 0;
        let totalError = 0;
        let totalCanceled = 0

        paymentList.forEach(item => {
            if (item.status === PAYMENT_STATUSES.DELETED) return;

            total += 1;
            if (item.status === PAYMENT_STATUSES.PENDING) {
                totalPending += 1;
            }
            if (item.status === PAYMENT_STATUSES.PAID) {
                totalPaid += 1;
            }
            if (item.status === PAYMENT_STATUSES.ONGOING) {
                totalOnGoing += 1;
            }
            if (item.status === PAYMENT_STATUSES.ERROR) {
                totalError += 1;
            }
            if (item.status === PAYMENT_STATUSES.CANCELED) {
                totalCanceled += 1;
            }
        })

        setStatistics([
            {
                key: "total",
                ...STATISTIC_MODEL.total,
                quantity: total,
            },
            {
                key: "pending",
                ...STATISTIC_MODEL.pending,
                quantity: totalPending,
                percent: Math.floor(totalPending / total * 100)
            },
            {
                key: "paid",
                ...STATISTIC_MODEL.paid,
                quantity: totalPaid,
                percent: Math.floor(totalPaid / total * 100)
            },
            {
                key: "ongoing",
                ...STATISTIC_MODEL.ongoing,
                quantity: totalOnGoing,
                percent: Math.floor(totalOnGoing / total * 100)
            },
            {
                key: "error",
                ...STATISTIC_MODEL.error,
                quantity: totalError,
                percent: Math.floor(totalError / total * 100)
            },
            {
                key: "canceled",
                ...STATISTIC_MODEL.canceled,
                quantity: totalCanceled,
                percent: Math.floor(totalCanceled / total * 100)
            }
        ]);
    }, [paymentList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default usePaymentStatistics;