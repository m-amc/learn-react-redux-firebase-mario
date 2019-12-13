// This is an action creator
export const createProject = (project) => {
  // This is how we normally do it without thunk. we return an object
  // return {
  //   type: 'ADD_PROJECT',
  //   project: project
  // }

  // This is how we are going to implement the action creator WITH thunk. we return a function
  // the dispatch arg - this dispatches an action to the reducer
  // when we first call an action creator inside a dispatch method from our component, we are ereturning a function and we are halting that dispatch but inside this function we are doing async call and then we resume dispatch

  // Because we use thunk.withExtraArgument, we can pass extra args in here
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      // after making the async call, we can resume the dispatch
      dispatch({ type: 'CREATE_PROJECT', project })
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    })
  }
}