import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";
import useTutorList from "./useTutorList";

//Icons
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import { LIST_TUTOR_STATUS } from "settings/tutor-setting";
import { TUTOR_STATUSES } from "settings/tutor-setting";
import { calculatePercentToFix } from "helpers/numberUtils";

const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",   
        icon: InsertChartOutlined,
    },
    active: {
        ...LIST_TUTOR_STATUS.find(item => item.value === TUTOR_STATUSES.ACTIVE),
        quantity: 0,
        icon: PieChart,
    },
    inactive: {
        ...LIST_TUTOR_STATUS.find(item => item.value === TUTOR_STATUSES.INACTIVE),
        quantity: 0,
        icon: PauseCircleFilledIcon,
    },
    banned: {
        icon: RemoveCircleIcon,
        ...LIST_TUTOR_STATUS.find(item => item.value === TUTOR_STATUSES.BANNED),
        quantity: 0,
    }
}

const useTutorStatistics = () => {
    const {
        tutorList,
        loading,
        refresh
    } = useTutorList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(tutorList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalActive = 0;
        let totalInactive = 0;
        let totalBanned = 0;

        tutorList.forEach(item => {
            if (item.status === TUTOR_STATUSES.DELETED) return;

            total += 1;
            if (item.status === TUTOR_STATUSES.ACTIVE) {
                totalActive += 1;
            }
            if (item.status === TUTOR_STATUSES.INACTIVE) {
                totalInactive += 1;
            }
            if (item.status === TUTOR_STATUSES.BANNED) {
                totalBanned += 1;
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
                percent: calculatePercentToFix(totalActive, total)
            },
            {
                key: "inactive",
                ...STATISTIC_MODEL.inactive,
                quantity: totalInactive,
                percent: calculatePercentToFix(totalInactive, total)
            },
            {
                key: "banned",
                ...STATISTIC_MODEL.banned,
                quantity: totalBanned,
                percent: calculatePercentToFix(totalBanned, total)
            }
        ]);
    }, [tutorList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default useTutorStatistics;