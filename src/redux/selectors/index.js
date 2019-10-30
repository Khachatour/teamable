export const getAllJobs = state => state.jobs

export const getSingleJob = jobId => state =>
  state.jobs.find(job => job.id === parseInt(jobId)) || null
