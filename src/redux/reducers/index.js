export default function reducer(state = { jobs: [] }, action) {
  switch (action.type) {
    case 'FETCH_JOBS_SUCCEEDED':
      return { ...state, jobs: [...state.jobs, ...action.data] }
    case 'FETCH_JOBS_FAILED':
      console.log('FETCH_JOBS_FAILED', action)
      return state
    default:
      return state
  }
}
