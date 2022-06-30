import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";
import { ADMIN_STATUSES } from "settings/admin-setting";
import { LIST_ADMIN_STATUS } from "settings/admin-setting";
import useAdminList from "./useAdminList";

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";


const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",   
        icon: InsertChartOutlined,
    },
    active: {
        ...LIST_ADMIN_STATUS.find(item => item.value === ADMIN_STATUSES.ACTIVE),
        quantity: 0,
        icon: PieChart,
    },
    disabled: {
        icon: RemoveCircleIcon,
        ...LIST_ADMIN_STATUS.find(item => item.value === ADMIN_STATUSES.DISABLED),
        quantity: 0,
    }
}

const useAdminStatistics = () => {
    const {
        adminList,
        loading,
        refresh
    } = useAdminList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(adminList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalActiveAdmin = 0;
        let totalDisabledAdmin = 0;

        adminList.forEach(item => {
            if (item.status === ADMIN_STATUSES.DELETED) return;

            total += 1;
            if (item.status === ADMIN_STATUSES.ACTIVE) {
                totalActiveAdmin += 1;
            }
            if (item.status === ADMIN_STATUSES.DISABLED) {
                totalDisabledAdmin += 1;
            }
        })

        setStatistics([
            {
                key: "total",
                ...STATISTIC_MODEL.total,
                quantity: total,
            },
            {
                key: "active",
                ...STATISTIC_MODEL.active,
                quantity: totalActiveAdmin,
                percent: Math.floor(totalActiveAdmin / total * 100)
            },
            {
                key: "disabled",
                ...STATISTIC_MODEL.disabled,
                quantity: totalDisabledAdmin,
                percent: Math.floor(totalDisabledAdmin / total * 100)
            }
        ]);
    }, [adminList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default useAdminStatistics;