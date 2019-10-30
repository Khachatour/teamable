import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleJob } from '../../redux/selectors'

const SingleJob = () => {
  const { id: jobId } = useParams()
  const job = useSelector(getSingleJob(jobId))
  console.log('jobid', job)
  if (!job) {
    return null
  }
  return <code>{JSON.stringify(job)}</code>
}

export default SingleJob
