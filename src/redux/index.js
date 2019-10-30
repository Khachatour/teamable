// import { createStore, applyMiddleware, compose } from 'redux'

// import rootSaga from './sagas'
// import createSagaMiddleware from 'redux-saga'

// const __REDUX_DEVTOOLS_EXTENSION__ = global.window
//   ?
//   : null

// const sagaMiddleware = createSagaMiddleware()

// function configureStore(initialState) {
//   return createStore(
//     root,
//     initialState,
// compose(applyMiddleware())
//   )
// }
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

// ...
import { fetchJobsSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(fetchJobsSaga)

export default store
