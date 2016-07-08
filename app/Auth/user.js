import axios from 'axios'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const LOGOUT = 'LOGOUT'

const ROOT_URL = '/api'

export function signup (formValues) {
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/users/signup`,
    data: formValues
  })
  return {
    type: SIGNUP_REQUEST,
    payload: request
  }
}
export function signupSuccess (user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: user
  }
}
export function signupFailure (error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  }
}

export function login (formValues) {
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/users/login`,
    data: formValues
  })
  return {
    type: LOGIN_REQUEST,
    payload: request
  }
}
export function loginSuccess (user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
export function loginFailure (error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}
export function logout () {
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/users/logout`
  })
  return {
    type: LOGOUT,
    payload: request
  }
}
export function getCurrentUser () {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/get/user/from/cookie`
  })
  return {
    type: GET_CURRENT_USER,
    payload: request
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNUP_REQUEST]: (state, action) => {
    return ({
      ...state,
      user: null,
      status: 'signup',
      error: null,
      loading: true
    })
  },
  [SIGNUP_SUCCESS]: (state, action) => {
    return ({
      ...state,
      user: action.payload.data,
      status: 'authenticated',
      error: null,
      loading: false
    })
  },
  [SIGNUP_FAILURE]: (state, action) => {
    let error = action.payload.data || {message: action.payload.message}
    return ({
      ...state,
      user: null,
      status: 'signup',
      error: error,
      loading: false
    })
  },
  [LOGIN_REQUEST]: (state, action) => {
    return ({
      ...state,
      user: null,
      status: 'signin',
      error: null,
      loading: true
    })
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return ({
      ...state,
      user: action.payload.data,
      status: 'authenticated',
      error: null,
      loading: false
    })
  },
  [LOGIN_FAILURE]: (state, action) => {
    let error = action.payload.data || {message: action.payload.message}
    return ({
      ...state,
      user: null,
      status: 'signin',
      error: error,
      loading: false
    })
  },
  [LOGOUT]: (state, action) => {
    return ({
      ...state,
      user: null,
      status: 'signin',
      error: null,
      loading: false
    })
  },
  [GET_CURRENT_USER]: (state, action) => {
    return {
      ...state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = {
  user: null,
  status: null,
  error: null,
  loading: false
}
export default function userReducer (state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
