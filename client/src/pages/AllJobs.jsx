import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobsContainer, SearchContainer } from "../assets/components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);

  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();
const AllJobs = () => {
  const { data, searchValues = {} } = useLoaderData();
  const { jobs, totalJobs } = data;

  return (
    <AllJobsContext.Provider value={{ jobs, searchValues, totalJobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
