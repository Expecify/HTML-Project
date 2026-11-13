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
  return `${SURGERY_NAME} is closed now. We open at ${formatTime(OPENING_HOUR * 60)}.`;
}

// slots
function generateSlots(startHour, endHour, minutesEach) {
  const slots = [];
  const end = Math.round(endHour * 60);
  for (let start = Math.round(startHour * 60); start + minutesEach <= end; start += minutesEach) {
    slots.push({
      start: formatTime(start),
      end: formatTime(start + minutesEach),
    });
  }
  return slots;
}

function isSlotBooked(slot, bookedSlots) {
  return bookedSlots.includes(slot.start);
}

function getAvailableSlots(slots, bookedSlots) {
  return slots.filter(slot => !isSlotBooked(slot, bookedSlots));
}

function countFreeSlots(slots, bookedSlots) {
  return getAvailableSlots(slots, bookedSlots).length;
}

// Run
console.log(getStatusMessage());

const allSlots  = generateSlots(OPENING_HOUR, CLOSING_HOUR, SLOT_MINUTES);
const available = getAvailableSlots(allSlots, bookedSlots);

console.log('Available slots:', available.map(s => `${s.start} - ${s.end}`));
console.log(`Free slots: ${countFreeSlots(allSlots, bookedSlots)} of ${allSlots.length}`);

// Update status message every minute
setInterval(() => {
  console.log(getStatusMessage());
}, 60000);