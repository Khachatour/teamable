import { call, put, takeEvery } from 'redux-saga/effects'

const fetchJobs = () =>
  fetch('https://tutamen.serveo.net/jobs').then(data => data.json())

export function* fetchJobsSaga() {
  try {
    const data = yield call(fetchJobs)
    yield put({ type: 'FETCH_JOBS_SUCCEEDED', data })
  } catch (error) {
    yield put({ type: 'FETCH_JOBS_FAILED', error })
  }
}

export function* watchJobs() {
  yield takeEvery('FETCH_JOBS', fetchJobsSaga)
}
