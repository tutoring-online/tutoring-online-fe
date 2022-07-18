import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";


//Icons
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import { LIST_CATEGORY_STATUS } from "settings/category-setting";
import { CATEGORY_STATUSES } from "settings/category-setting";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import useCategoryList from "./useCategoryList";

const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",   
        icon: InsertChartOutlined,
    },
    active: {
        ...LIST_CATEGORY_STATUS.find(item => item.value === CATEGORY_STATUSES.ACTIVE),
        quantity: 0,
        icon: PieChart,
    },
    inactive: {
        icon: PauseCircleFilledIcon,
        ...LIST_CATEGORY_STATUS.find(item => item.value === CATEGORY_STATUSES.INACTIVE),
        quantity: 0,
    },
}

const useCategoryStatistics = () => {
    const {
        categoryList,
        loading,
        refresh
    } = useCategoryList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(categoryList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalActive = 0;
        let totalInactive= 0;

        categoryList.forEach(item => {
            if (item.status === CATEGORY_STATUSES.DELETED) return;

            total += 1;
            if (item.status === CATEGORY_STATUSES.ACTIVE) {
                totalActive += 1;
            }
            if (item.status === CATEGORY_STATUSES.INACTIVE) {
                totalInactive += 1;
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
                quantity: totalActive,
                percent: Math.floor(totalActive / total * 100)
            },
            {
                key: "inactive",
                ...STATISTIC_MODEL.inactive,
                quantity: totalInactive,
                percent: Math.floor(totalInactive / total * 100)
            },
        ]);
    }, [categoryList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default useCategoryStatistics;