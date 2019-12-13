// Firebase is going to take all this code and run these in the server
const functions = require('firebase-functions');

// we need to import the firebase-admin to interact with different services in firebase
const admin = require('firebase-admin');

// initialize firebase-admin so we can use admin SDK to interact with different services like authentication and firestore service
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
  // response.send("Hello from Firebase!");
  response.send("Hello, Ninjas");
});

const createNotification = (notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
}

// listen to when project is created.  The trigger is to go to the firesotre and check when a new project is created, fire the callback func
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
  });

// Fire this when the user is created using the auth service
exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
      })
  })