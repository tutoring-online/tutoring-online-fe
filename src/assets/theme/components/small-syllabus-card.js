const componentStyles = ({ breakpoints, spacing }) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'initial',
        
        paddingBottom: spacing(2),
        borderRadius: spacing(2), // 16px

        position: 'relative',
        transition: '0.3s',
        background: '#f7fafc',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        [breakpoints.up('sm')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
            alignItems: 'flex-start',
        },
    },
    media: {
        width: '100%',
        height: 0,
        marginRight: 'auto',
        paddingBottom: '200px',

        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        transition: "transform 0.2s ease-in-out",

        [breakpoints.up('sm')]: {
            marginLeft: "16px",
            maxWidth: '120px',
            paddingBottom: '80px',
            marginTop: 0,
        },
        '&:hover': {
            transform: "scale(1.05)"
        }
    },
    content: {
        padding: "16px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
        [breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: "0 16px !important",
        },
    },
    cta: {
        marginTop: 20,
        textTransform: 'initial',
    },
})

export default componentStyles;
