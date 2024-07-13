// upload.js

// Function to initialize Google API client
function initClient() {
    gapi.client.init({
      'apiKey': 'ae2132f6c1c5500ca570b42e2ffa2ec81df015f4', // Replace with your actual API key
      'clientId': '434298907396-34gv89ooenj2f1e43kir4m2lf0ndflmp.apps.googleusercontent.com', // Replace with your actual Client ID
      'scope': 'https://www.googleapis.com/auth/drive.file',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function (error) {
      console.error(JSON.stringify(error, null, 2));
    });
  }
  
  // Function to handle Google API client load
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  // Function to update sign-in status
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      console.log('Signed in');
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }
  
  // Function to handle file upload form submission
  document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file');
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      uploadFile(file, dateInput, timeInput);
    } else {
      console.error('No file selected');
    }
  });
  
  // Function to upload file to Google Drive
  function uploadFile(file, date, time) {
    const folderId = '1XtDueHOYvYQ_twLofThtvzeIPaCtlofc'; // Replace with your folder ID
  
    const metadata = {
      'name': file.name,
      'parents': ["1XtDueHOYvYQ_twLofThtvzeIPaCtlofc"], // Specify the folder ID here
      'mimeType': file.type,
      'description': `Appointment Date: ${date}, Time: ${time}`
    };
  
    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
  
    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      alert('File uploaded successfully!');
    }).catch((error) => {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    });
  }
  
  // Initialize the Google API client when the DOM is loaded
  document.addEventListener('DOMContentLoaded', handleClientLoad);
  