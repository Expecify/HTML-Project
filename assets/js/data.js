/* =========================================================
   MedBook - data.js
   Sample data for the front end.
 
   From week 17 this comes from MySQL instead. The SHAPE
   stays identical, which is why it is worth getting right.
   ========================================================= */
 
'use strict';
console.log('data.js loaded');
 
const CLINICIANS = [
  { id: 1, name: 'Dave Martinez',     role: 'GP',
    specialisms: ['Diabetes', 'Medicine'],
    acceptingNew: true },
  { id: 2, name: 'Lucy Kushinada',   role: 'Dermatologist',
    specialisms: ['Skin Care', 'Minor surgery'],
    acceptingNew: false },
  { id: 3, name: 'Rebecca', role: 'Cardiologist',
    specialisms: ['Vaccinations', 'Wound care'],
    acceptingNew: true },
  { id: 4, name: 'Katsuo Tanaka',  role: 'Mental Health Specialist',
    specialisms: ['Counselling', 'Therapy', 'Medicine'],
    acceptingNew: true }
];
 
const APPOINTMENT_TYPES = [
  { code: 'gp',     label: 'GP appointment',        minutes: 10 },
  { code: 'derm',  label: 'Dermatology clinic',          minutes: 20 },
  { code: 'cardio', label: 'Cardiology consultation',            minutes: 30 },
  { code: 'mental',   label: 'Mental Health appointment', minutes: 15 },
  { code: 'phone',  label: 'Telephone consultation', minutes: 10 }
];
function getCliniciansByRole(role) {
  return CLINICIANS.filter(c => c.role === role);
}

function acceptingNew() {
    return CLINICIANS.filter(c => c.acceptingNew === true);
}

function findClinicianById(id) {
  return CLINICIANS.find(c => c.id === id);
}

function getClinicianNames() {
  return CLINICIANS.map(c => c.name);
}

function getAllSpecialisms() {
  const specialisms = new Set();
  CLINICIANS.forEach(c => c.specialisms.forEach(s => specialisms.add(s)));
  return Array.from(specialisms);
}

function getTypeByCode(code) {
  return APPOINTMENT_TYPES.find(t => t.code === code);
}

function getDurationByCode(code) {
  const type = getTypeByCode(code);
  return type ? type.minutes : null;
}

function countByRole(role) {
  return CLINICIANS.filter(c => c.role === role).length;
}

console.log(getCliniciansByRole('GP'));
console.log(acceptingNew());
console.log(findClinicianById(99));
console.table(findClinicianById(1));
console.log(getClinicianNames());
console.log(getAllSpecialisms());
console.log(getTypeByCode('gp'));
console.log(getDurationByCode('gp'));
console.log(countByRole('GP'));