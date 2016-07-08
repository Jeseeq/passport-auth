import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import user from '../Auth/user'

const rootReducer = combineReducers({
  user,
  form
})

export default rootReducer
