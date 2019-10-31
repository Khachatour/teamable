import React, { useEffect, useState } from 'react'

import { isEmpty } from '../../utils'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { getAllJobs } from '../../redux/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import './JobList.styles.sass'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '20px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  urgent: {
    color: 'red'
  },
  urgency: {
    marginBottom: 12
  }
})

const JobList = () => {
  const history = useHistory()
  const jobs = useSelector(getAllJobs)
  const dispatch = useDispatch()
  const [urgencyStatus, setUrgencyStatus] = useState(false)
  const setUrgency = () => setUrgencyStatus(!urgencyStatus)
  const classes = useStyles()

  const onCreate = () => history.push('/create')

  useEffect(() => {
    dispatch({ type: 'FETCH_JOBS' })
  }, [])

  if (!jobs) {
    return null
  }

  return (
    <>
      <div className="job-list-filter">
        Show urgent jobs:
        <Switch
          value="urgencyStatus"
          onChange={setUrgency}
          checked={urgencyStatus}
        />
      </div>
      <div className="job-list-wrapper">
        {jobs
          .filter(job => (urgencyStatus ? job.urgent : job))
          .map((job, idx) => (
            <Card className={classes.card} key={idx}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {job.location}
                </Typography>
                <Typography variant="h5" component="h2">
                  {job.title}
                </Typography>
                <Typography color="textSecondary" className={classes.urgency}>
                  Urgency status:{' '}
                  <span className={job.urgent ? classes.urgent : ''}>
                    {job.urgent ? 'Urgent' : 'Not urgent'}
                  </span>
                </Typography>
                <Typography variant="body2" component="p">
                  Bonus: {job.bonus}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/job/${job.id}`} className="link">
                  <Button variant="contained" size="small">
                    View Job
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        <Card className={classes.card}>
          <CardContent className="add-job" onClick={onCreate}>
            +
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default JobList
