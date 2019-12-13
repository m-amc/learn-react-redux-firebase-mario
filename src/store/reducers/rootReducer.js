import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';

// this reducer syncs our firestore data with our state in the background

import { firestoreReducer } from 'redux-firestore';

import { firebaseReducer } from 'react-redux-firebase';

// Inside combineReducer is an object and we will define properties that will hold our reducers
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  // firestoreReducer is automatically syncs the "firestore" property on the state object to our data in the db. it's going to retrieve the data for us
  // we need to tell our component which data to sync
  firestore: firestoreReducer,

  // This will sync our auth status on firebase with our redux app in the state and pop this in the firebase object. redux is now set up and it will detect whether we sign in or out of the auth service in firebase and it will update this state accordingly
  firebase: firebaseReducer
})

export default rootReducer;