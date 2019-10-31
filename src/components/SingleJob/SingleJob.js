import React from 'react'

import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleJob } from '../../redux/selectors'

import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'

import './SingleJob.styles.sass'

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 auto',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
})

const createData = (title, location, bonus, urgent) => ({
  title,
  location,
  bonus,
  urgent
})

const SingleJob = () => {
  const history = useHistory()
  const { id: jobId } = useParams()
  const job = useSelector(getSingleJob(jobId))
  const classes = useStyles()

  const remove = () => {
    fetch(`https://tutamen.serveo.net/jobs/${jobId}`, {
      method: 'DELETE'
    }).then(() => history.push('/'))
  }

  if (!job) {
    return null
  }

  return (
    <div className="sinle-job-wrapper">
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Bonus</TableCell>
              <TableCell align="right">Urgent?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {job.title}
              </TableCell>
              <TableCell align="right">{job.location}</TableCell>
              <TableCell align="right">{job.bonus}</TableCell>
              <TableCell align="right">{job.urgent ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <div className="button-wrapper">
        <Link to={`/edit-job/${job.id}`} className="link">
          <Button variant="contained" size="small">
            Edit Job
          </Button>
        </Link>
        <Button
          className="delete"
          size="small"
          onClick={remove}
          variant="contained"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default SingleJob
