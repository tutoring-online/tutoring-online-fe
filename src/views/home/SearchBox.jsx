// import TutorSearchField from "components/custom/TutorSearchField";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider } from "@mui/material"
import NTARangeField from "components/Form/NTARangeField";
import NTASelectField from "components/Form/NTASelectField"
import { isAvailableArray } from "helpers/arrayUtils";
import yup from "helpers/yupGlobal";
import useCategoryList from "hooks/category/useCategoryList";
import useSubjectList from "hooks/subject/useSubjectList";
import useSyllabusList from "hooks/syllabus/useSyllabusList";
import { useForm } from "react-hook-form";
import ReactNumberFormat from 'react-number-format';
import { DURATION_OPTIONS } from "settings/syllabus-setting";

const SearchBar = ({ children }) => (
    <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"

        backgroundColor="#fff"
        borderRadius="16px"
        overflow="visible"
        marginTop="1rem"
    >
        {children}
    </Box>
)

const schema = yup.object().shape({
    // name: yup.string().required("Name is required"),
    // email: yup.string().required("Email is required").email("Email is invalid"),
});

const getSubjectOptions = (subjectList) => {
    const options = isAvailableArray(subjectList) ? subjectList.map(item => ({
        label: item.name,
        value: item.id
    })) : [];
    options.push({ label: "All", value: "" })

    return options;
}

const getCategoryOptions = (categoryList) => {
    const options = isAvailableArray(categoryList) ? categoryList.map(item => ({
        label: item.name,
        value: item.id
    })) : [];
    options.push({ label: "All", value: "" })

    return options;
}

const DEFAULT_MAX_PRICE = 1 * 1000 * 1000;


const getMaxPrice = (syllabusList) => {
    let maxPrice = DEFAULT_MAX_PRICE;

    isAvailableArray(syllabusList) && syllabusList.forEach(syllabus => {
        if (syllabus.price > maxPrice) {
            maxPrice = syllabus.price;
        }
    })

    return maxPrice
}

const renderDisplayRange = (value) => {
    if (!isAvailableArray(value)) return;
    const [from, to] = value;
    return (
        <Box>
            <ReactNumberFormat
                displayType="text"
                value={from || 0}
                thousandSeparator={true}
                suffix="₫"
            />
            {` - `}
            <ReactNumberFormat
                displayType="text"
                value={to || 0}
                thousandSeparator={true}
                suffix="₫"
            />
        </Box>
    )
}

const CustomDivider = () => (
    <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ borderColor: "#dadfe1", margin: "16px 0" }}
    />
)

const getDurationOptions = () => {
    const options = [...DURATION_OPTIONS];
    options.push({ label: "All", value: "" });
    return options;
}

export default function SearchBox() {
    const {
        control,
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            categoryId: "",
            subjectId: "",
            duration: "",
            price: [0, DEFAULT_MAX_PRICE],

        },
        resolver: yupResolver(schema),
    });


    const { subjectList } = useSubjectList();
    const { syllabusList } = useSyllabusList();
    const { categoryList } = useCategoryList();

    const maxPrice = getMaxPrice(syllabusList);

    return (
        <>
            <Box
                component="div"
                className="home-search-box"
            >
                <Box
                    component="h1"
                    className="home-search-box__title"
                >
                    Find an online syllabus to help you study
                </Box>
                <Box
                    component="p"
                    className="home-search-box__description"
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
                </Box>

                <SearchBar>
                    <NTASelectField
                        label="Grade"
                        name="categoryId"
                        options={getCategoryOptions(categoryList)}
                        control={control}
                    />
                    <CustomDivider />
                    <NTASelectField
                        label="I want to learn"
                        name="subjectId"
                        options={getSubjectOptions(subjectList)}
                        control={control}
                    />
                    <CustomDivider />
                    <NTASelectField
                        label="Duration"
                        name="duration"
                        options={getDurationOptions()}
                        control={control}
                    />
                    <CustomDivider />
                    <NTARangeField
                        label="Price"
                        name="price"
                        max={maxPrice}
                        control={control}
                        renderDisplayRange={renderDisplayRange}
                    />
                </SearchBar>
            </Box>
        </>
    )
}