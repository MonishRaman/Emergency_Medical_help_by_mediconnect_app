function bookAppointment() {
    window.location.href = 'login.html'; // Replace with your login page URL
}

function instantVideoConsult() {
    // You can add functionality for the instant video consult here
    alert("Instant Video Consult feature is not implemented yet.");
}
function redirectToZoom(zoomLink) {
    window.location.href = zoomLink;
}
// Define an array of doctor profile URLs
const doctorProfiles = [
    'profile1.html',
    'profile2.html',
    'profile3.html',
    // Add more profiles as needed
];

// Track the current profile index
let currentProfileIndex = 0;

// Function to navigate to the next profile
function goToNextProfile() {
    // Increment the profile index
    currentProfileIndex = (currentProfileIndex + 1) % doctorProfiles.length;

    // Redirect to the next profile
    window.location.href = doctorProfiles[currentProfileIndex];
}

// Add an event listener to the "Next" button
document.getElementById('nextButton').addEventListener('click', goToNextProfile);
