import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension'

import { fetchJobsSaga, watchJobs } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

function* rootSaga() {
  yield all([fetchJobsSaga(), watchJobs()])
}

sagaMiddleware.run(rootSaga)

export default store
