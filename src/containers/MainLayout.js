import Footer from "components/Footer";
import Header from "components/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="main">{children}</section>
      <Footer />
    </>
  );
};

export default MainLayout;
