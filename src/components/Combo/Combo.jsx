import { Box } from '@mui/system'
import { isAvailableArray } from 'helpers/arrayUtils'
import React from 'react'

export const ComboItem = ({ content }) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="0.375rem 0.75rem"
        maxWidth="fit-content"

        color="#fff"
        bgcolor="#04AA6D"
        borderRadius="4px"  
        fontWeight="600"
    >
        {content}
    </Box>
)

export default function Combo({
    list
}) {
    return (
        <Box
            display="flex"
            alignItems="center"
            columnGap="0.5rem"
        >
            {isAvailableArray(list) && list.map(content =>
                <ComboItem
                    key={content}
                    content={content}
                />
            )}
        </Box>
    )
}
