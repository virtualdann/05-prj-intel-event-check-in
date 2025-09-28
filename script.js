// Counter variables
let totalAttendees = 0;
let waterTeamCount = 0;
let zeroTeamCount = 0;
let powerTeamCount = 0;
const maxGoal = 50;
let attendeeList = [];

// Function to save counts to local storage
function saveCounts() {
  localStorage.setItem('totalAttendees', totalAttendees);
  localStorage.setItem('waterTeamCount', waterTeamCount);
  localStorage.setItem('zeroTeamCount', zeroTeamCount);
  localStorage.setItem('powerTeamCount', powerTeamCount);
  localStorage.setItem('attendeeList', JSON.stringify(attendeeList));
}

// Function to load counts from local storage
function loadCounts() {
  const savedTotal = localStorage.getItem('totalAttendees');
  const savedWater = localStorage.getItem('waterTeamCount');
  const savedZero = localStorage.getItem('zeroTeamCount');
  const savedPower = localStorage.getItem('powerTeamCount');
  const savedAttendeeList = localStorage.getItem('attendeeList');

  if (savedTotal !== null) {
    totalAttendees = parseInt(savedTotal);
  }
  if (savedWater !== null) {
    waterTeamCount = parseInt(savedWater);
  }
  if (savedZero !== null) {
    zeroTeamCount = parseInt(savedZero);
  }
  if (savedPower !== null) {
    powerTeamCount = parseInt(savedPower);
  }
  if (savedAttendeeList !== null) {
    attendeeList = JSON.parse(savedAttendeeList);
  }
}

// Get form and elements
const checkInForm = document.getElementById('checkInForm');
const attendeeNameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greetingMessage = document.getElementById('greeting');
const attendeeCountSpan = document.getElementById('attendeeCount');
const progressBar = document.getElementById('progressBar');
const waterCountSpan = document.getElementById('waterCount');
const zeroCountSpan = document.getElementById('zeroCount');
const powerCountSpan = document.getElementById('powerCount');
const attendeeListContainer = document.getElementById('attendeeListContainer');

// Function to update team count display
function updateTeamCount(elementId, count) {
  const element = document.getElementById(elementId);
  element.textContent = count;
}

// Function to update attendee list display
function updateAttendeeList() {
  attendeeListContainer.innerHTML = '';

  attendeeList.forEach(function(attendee) {
    const attendeeItem = document.createElement('div');
    attendeeItem.className = 'attendee-item';

    const attendeeName = document.createElement('span');
    attendeeName.className = 'attendee-name';
    attendeeName.textContent = attendee.name;

    const attendeeTeam = document.createElement('span');
    attendeeTeam.className = `attendee-team ${attendee.team}`;
    const teamLabels = {
      water: 'Water Wise',
      zero: 'Net Zero',
      power: 'Renewables'
    };
    attendeeTeam.textContent = teamLabels[attendee.team];

    attendeeItem.appendChild(attendeeName);
    attendeeItem.appendChild(attendeeTeam);
    attendeeListContainer.appendChild(attendeeItem);
  });
}

// Function to update all display elements
function updateAllDisplays() {
  attendeeCountSpan.textContent = totalAttendees;
  updateTeamCount('waterCount', waterTeamCount);
  updateTeamCount('zeroCount', zeroTeamCount);
  updateTeamCount('powerCount', powerTeamCount);
  updateAttendeeList();

  const progressPercentage = (totalAttendees / maxGoal) * 100;
  progressBar.style.width = progressPercentage + '%';

  checkMaxAttendees();
}

// Function to check max attendees and disable form if needed
function checkMaxAttendees() {
  if (totalAttendees >= maxGoal) {
    attendeeNameInput.disabled = true;
    teamSelect.disabled = true;
    const checkInBtn = document.getElementById('checkInBtn');
    checkInBtn.disabled = true;
  }
}

// Load saved counts when page loads
loadCounts();
updateAllDisplays();

// Add form submission event listener
checkInForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const attendeeName = attendeeNameInput.value;
  const selectedTeam = teamSelect.value;

  // Check if max attendees reached
  if (totalAttendees >= maxGoal) {
    const maxMessage = `Max attendees count. Sorry ${attendeeName}!`;
    greetingMessage.textContent = maxMessage;
    greetingMessage.style.display = 'block';
    greetingMessage.className = 'success-message';
    checkInForm.reset();
    return;
  }

  // Add attendee to list
  const attendee = {
    name: attendeeName,
    team: selectedTeam
  };
  attendeeList.push(attendee);

  // Increment total count
  totalAttendees = totalAttendees + 1;

  // Update team-specific count
  if (selectedTeam === 'water') {
    waterTeamCount = waterTeamCount + 1;
  } else if (selectedTeam === 'zero') {
    zeroTeamCount = zeroTeamCount + 1;
  } else if (selectedTeam === 'power') {
    powerTeamCount = powerTeamCount + 1;
  }

  // Update all displays
  updateAllDisplays();

  // Create personalized welcome message
  const teamNames = {
    water: 'Team Water Wise',
    zero: 'Team Net Zero',
    power: 'Team Renewables'
  };
  const fullTeamName = teamNames[selectedTeam];
  const welcomeMessage = `🎉 Welcome, ${attendeeName} from ${fullTeamName}!`;

  // Display welcome message
  greetingMessage.textContent = welcomeMessage;
  greetingMessage.style.display = 'block';
  greetingMessage.className = 'success-message';

  // Save counts to local storage
  saveCounts();

  // Reset form
  checkInForm.reset();
});
