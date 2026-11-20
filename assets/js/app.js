'use strict';

// Surgery details
const SURGERY_NAME  = 'Northfield Surgery';
const SURGERY_PHONE = '01752 000000';
const OPENING_HOUR  = 8;      // 24-hour clock
const CLOSING_HOUR  = 18.5;   // 6:30pm
const SLOT_MINUTES  = 30;
const bookedSlots   = ['09:30', '11:00', '14:00'];   // start times

console.log(`${SURGERY_NAME} - script loaded`);

// Helpers
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isWithinOpeningHours(date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  return hour >= OPENING_HOUR && hour < CLOSING_HOUR;
}

function isSurgeryOpen(date = new Date()) {
  return !isWeekend(date) && isWithinOpeningHours(date);
}

// whole minutes since midnight -> "HH:MM"
function formatTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getStatusMessage(date = new Date()) {
  if (isSurgeryOpen(date)) {
    return `${SURGERY_NAME} is open now. Call us on ${SURGERY_PHONE}.`;
  }
  const day = date.getDay();
  const beforeOpening = !isWeekend(date) && date.getHours() < OPENING_HOUR;
  let when = 'tomorrow';
  if (beforeOpening) when = 'today';
  else if (day === 5 || day === 6 || day === 0) when = 'on Monday';
  return `${SURGERY_NAME} is closed now. We open ${when} at ${formatTime(OPENING_HOUR * 60)}.`;
}

// slots
// Returns: [{ time: '08:00', available: true }, ...]
function generateSlots(startHour, endHour, minutesEach, booked = []) {
  const slots = [];
  const end = Math.round(endHour * 60);

  for (let start = Math.round(startHour * 60); start + minutesEach <= end; start += minutesEach) {
    const time = formatTime(start);
    slots.push({
      time: time,
      available: !booked.includes(time)
    });
  }

  return slots;
}

function getAvailableSlots(slots) {
  return slots.filter(slot => slot.available);
}
function countAvailableSlots(slots) {
  return getAvailableSlots(slots).length;
}
function nextAvailableSlot(slots) {
  const available = getAvailableSlots(slots);
  return available.length > 0 ? available[0] : null;
}
function saveDraft(data) {
  try {
    localStorage.setItem('medbook:bookingDraft', JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Could not save draft:', error.message);
    return false;
  }
}
 
function loadDraft() {
  try {
    const raw = localStorage.getItem('medbook:bookingDraft');
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Could not read draft:', error.message);
    return null;
  }
}

// Run
console.log(getStatusMessage());

const allSlots  = generateSlots(OPENING_HOUR, CLOSING_HOUR, SLOT_MINUTES, bookedSlots);
const available = getAvailableSlots(allSlots);

console.table('Available slots:', available.map(s => s.time));
console.table(`Free slots: ${countAvailableSlots(allSlots)} of ${allSlots.length}`);
console.table('All slots:', allSlots.map(s => `${s.time} (${s.available ? 'free' : 'booked'})`));
console.log('--------------------------');
console.table(generateSlots(9, 12, 30, ['09:30', '11:00']));
console.log('Next available slot:', nextAvailableSlot(allSlots) || 'No Slots Available Today');