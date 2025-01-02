import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobsContainer, SearchContainer } from "../assets/components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <>
      <JobsContainer />
      <SearchContainer />
    </>
  );
};

export default AllJobs;
