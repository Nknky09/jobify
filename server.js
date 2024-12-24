import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import fs from "fs";

const app = express();

const DATA_FILE = "./jobs.json";

const loadJobs = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (error) {
    return [
      { id: nanoid(), company: "apple", position: "front-end" },
      { id: nanoid(), company: "google", position: "back-end" },
    ];
  }
};

const saveJobs = jobs => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
};

let jobs = loadJobs();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  console.log(jobss);
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  saveJobs(jobs);
  res.status(201).json({ job });
});

// GET SINGLE JOB
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find(job => job.id === id);
  if (!job) {
    throw new Error("no job with that id");
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT JOB
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }

  const jobIndex = jobs.findIndex(job => job.id === id);
  if (jobIndex === -1) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  jobs[jobIndex] = { ...jobs[jobIndex], company, position };
  saveJobs(jobs);

  res.status(200).json({ msg: "job modified", job: jobs[jobIndex] });
});

// DELETE JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = jobs.length;
  jobs = jobs.filter(job => job.id !== id);

  if (jobs.length === initialLength) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  saveJobs(jobs);
  res.status(200).json({ msg: "job deleted" });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}...`);
});
