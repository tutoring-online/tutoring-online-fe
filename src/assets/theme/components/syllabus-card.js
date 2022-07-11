const componentStyles = ({ breakpoints, spacing }) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'initial',
        
        maxWidth: 800,
        marginLeft: 'auto',
        paddingBottom: spacing(2),
        borderRadius: spacing(2), // 16px

        position: 'relative',
        transition: '0.3s',
        background: '#f7fafc',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
            alignItems: 'flex-start',
        },
    },
    media: {
        width: '150px',
        maxWidth: '150px',
        height: 0,
        marginLeft: 16,
        marginRight: 'auto',
        paddingBottom: '150px',

        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        transition: "transform 0.2s ease-in-out",

        [breakpoints.up('md')]: {
            width: '100%',
            marginTop: 0,
        },
        '&:hover': {
            transform: "scale(1.05)"
        }
    },
    content: {
        padding: "0 16px !important",
        height: "100%"
    },
    cta: {
        marginTop: 20,
        textTransform: 'initial',
    },
})

export default componentStyles;
