import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { getSingleJob, getAllJobs } from '../../redux/selectors'
import TextField from '@material-ui/core/TextField'

import './EditJob.styles.sass'
// {"id":1,"title":"Software Engineer","location":"Yerevan","bonus":"1000","urgent":true}
const EditJob = () => {
  const { id: jobId } = useParams()
  const history = useHistory()
  const _job = useSelector(getSingleJob(jobId))
  const jobs = useSelector(getAllJobs)

  const [job, setJob] = useState(_job)

  const _setJob = prop => e => setJob({ ...job, [prop]: e.target.value })

  useEffect(() => {
    setJob(_job)
  }, [_job])

  const editJob = () =>
    fetch(`https://tutamen.serveo.net/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    }).then(() => history.push('/'))

  if (!job) {
    return null
  }
  return (
    <div className="edit-job-wrapper">
      <TextField
        multiline
        rowsMax="4"
        value={job.title}
        margin="normal"
        label="Job title"
        onChange={_setJob('title')}
        id="standard-multiline-flexible"
      />
      <TextField
        multiline
        rowsMax="4"
        value={job.location}
        margin="normal"
        label="Job locatioon"
        onChange={_setJob('location')}
        id="standard-multiline-flexible"
      />
      <TextField
        multiline
        rowsMax="4"
        label="Bonus"
        margin="normal"
        value={job.bonus}
        onChange={e => setJob({ ...job, bonus: parseInt(e.target.value) })}
        id="standard-multiline-flexible"
      />
      <div className="urgency">
        Is urgent?:
        <Switch
          label="Urgent?"
          value={job.urgent}
          checked={job.urgent}
          onChange={e => setJob({ ...job, urgent: e.target.checked })}
        />
      </div>
      <Button
        size="small"
        onClick={editJob}
        variant="contained"
        className="save-job"
      >
        Save Job
      </Button>
    </div>
  )
}

export default EditJob
