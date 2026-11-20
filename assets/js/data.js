/* =========================================================
   MedBook - data.js
   Sample data for the front end.
 
   From week 17 this comes from MySQL instead. The SHAPE
   stays identical, which is why it is worth getting right.
   ========================================================= */
 
'use strict';
 
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
  { id: 4, name: 'Katsuo Tanaka',         role: 'Mental Health Specialist',
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
