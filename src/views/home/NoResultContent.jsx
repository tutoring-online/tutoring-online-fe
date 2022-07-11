import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';


const NoResultContent = () => (
    <Box
        backgroundColor="#fff"
        borderRadius="1rem"
        padding="1rem"

        display="flex"
        flexDirection="row"
    >
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            backgroundColor="#f8463d"
            height="50px"
            width="50px"
            marginRight="1rem"
        >
            <SearchIcon
                sx={{
                    width: 24,
                    height: 24,
                    color: "#fff"
                }}
            />
        </Box>

        <Box
            display="flex"
            flexDirection="column"
        >
            <Typography
                fontSize="20px"
                fontWeight="500"
            >
                No results found. But we've put together a list of syllabuses just for you!
            </Typography>

            <Typography
                fontSize="14px"
                fontWeight="500"
            >
                For more results, please make sure to change your filters
            </Typography>
        </Box>
    </Box>
)

export default NoResultContent;
