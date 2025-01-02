import React from "react";
import { FormRow, FormRowSelect } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const EditJob = () => {
  return <h1>EditJob</h1>;
};

export default EditJob;
