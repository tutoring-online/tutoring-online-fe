import "./index.scss"

function FullPageLoader() {
    return (
        <div className="full-page-loader">
            <div className="full-page-loader__icon">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="full-page-loader__content">LOADING...</div>
        </div>

    );
}

export default FullPageLoader;