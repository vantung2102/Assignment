import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper } from "../../global/jsx/common";

const Home = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar />
    </MainWrapper>
  );
};

export default Home;
