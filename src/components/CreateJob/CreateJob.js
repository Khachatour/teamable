import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { getSingleJob, getAllJobs } from '../../redux/selectors'
import TextField from '@material-ui/core/TextField'

const initalValue = {
  title: 'Job Title',
  location: 'Job Location',
  bonus: 99999,
  urgent: false
}

import './CreateJob.styles.sass'

const EditJob = () => {
  const history = useHistory()
  const [job, setJob] = useState(initalValue)
  const _setJob = prop => e => setJob({ ...job, [prop]: e.target.value })

  const createJob = () =>
    fetch(`https://tutamen.serveo.net/jobs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    }).then(() => history.push('/'))

  return (
    <div className="edit-job-wrapper">
      <TextField
        multiline
        rowsMax="4"
        margin="normal"
        value={job.title}
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
        onClick={createJob}
        variant="contained"
        className="save-job"
      >
        Save Job
      </Button>
    </div>
  )
}

export default EditJob
