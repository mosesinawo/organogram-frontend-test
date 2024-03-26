import React from "react";
import Header from "./Header";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default AppLayout;
