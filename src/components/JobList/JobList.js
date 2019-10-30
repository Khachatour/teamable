import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
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
  const [jobs, setJobs] = useState(null)
  const classes = useStyles()
  // useEffect(() => {
  //   fetch('https://tutamen.serveo.net/jobs')
  //     .then(data => data.json())
  //     .then(setJobs)
  // }, [])

  if (!jobs) {
    return null
  }

  return (
    <div className="job-list-wrapper">
      {jobs.map((job, idx) => (
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
            <Link to={`/jobs/${job.id}`} className="link">
              <Button variant="contained" size="small">
                Edit
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default JobList
