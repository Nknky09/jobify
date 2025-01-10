import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../../pages/AllJobs";

const PageBtnContainer = () => {
  const { numOfPages, currentPage } = useAllJobsContext();
  console.log(numOfPages, currentPage);
  return <h1>PageBtnContainer</h1>;
  s;
};

export default PageBtnContainer;
