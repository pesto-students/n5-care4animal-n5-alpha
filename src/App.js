import React from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import { Routes } from "routes";

import ErrorBoundary from "errorhandling/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <section className="main">
          <Routes />
        </section>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default App;
