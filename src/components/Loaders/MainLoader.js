import LoadingOverlay from "react-loading-overlay";

const MainLoader = () => (
  <LoadingOverlay
    className="main-loader"
    active={true}
    spinner
    text="Loading your content..."
  ></LoadingOverlay>
);

export default MainLoader;
