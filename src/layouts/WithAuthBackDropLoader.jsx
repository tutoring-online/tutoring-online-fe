import BackDropLoader from "components/Loading/BackDropLoader";

const WithAuthBackDropLoader = ({ open, children }) => {
    return (
        <>
            {open &&
                <BackDropLoader
                    open={open}
                    text="Checking user..."
                />
            }
            {children}
        </>
    )
}

export default WithAuthBackDropLoader;