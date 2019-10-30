import { call, put } from 'redux-saga/effects'

const fetchJobs = () =>
  fetch('https://tutamen.serveo.net/jobs').then(data => data.json())

export function* fetchJobsSaga() {
  console.log('Hello Sagas!')
  try {
    const data = yield call(fetchJobs)
    yield put({ type: 'FETCH_JOBS_SUCCEEDED', data })
  } catch (error) {
    yield put({ type: 'FETCH_JOBS_FAILED', error })
  }
}
