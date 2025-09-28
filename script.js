// Counter variables
let totalAttendees = 48;
let waterTeamCount = 0;
let zeroTeamCount = 0;
let powerTeamCount = 0;
const maxGoal = 50;

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

  // Increment total count
  totalAttendees = totalAttendees + 1;

  // Update team-specific count
  if (selectedTeam === 'water') {
    waterTeamCount = waterTeamCount + 1;
    updateTeamCount('waterCount', waterTeamCount);
  } else if (selectedTeam === 'zero') {
    zeroTeamCount = zeroTeamCount + 1;
    updateTeamCount('zeroCount', zeroTeamCount);
  } else if (selectedTeam === 'power') {
    powerTeamCount = powerTeamCount + 1;
    updateTeamCount('powerCount', powerTeamCount);
  }

  // Calculate progress percentage
  const progressPercentage = (totalAttendees / maxGoal) * 100;

  // Update total attendance display
  attendeeCountSpan.textContent = totalAttendees;

  // Update progress bar width
  progressBar.style.width = progressPercentage + '%';

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

  // Reset form
  checkInForm.reset();
});

// Function to update team count display
function updateTeamCount(elementId, count) {
  const element = document.getElementById(elementId);
  element.textContent = count;
}
