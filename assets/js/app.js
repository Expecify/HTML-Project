/* =========================================================
   MedBook - Northfield Surgery
   app.js - site-wide behaviour
 
   Week 6:  surgery details, opening status
   =========================================================  */
 
'use strict';
 
// ---------------------------------------------------------
// Surgery details
// ---------------------------------------------------------
 
const SURGERY_NAME  = 'Northfield Surgery';
const SURGERY_PHONE = '01752 000000';
const OPENING_HOUR  = 8;      // 24-hour clock
const CLOSING_HOUR  = 18.5;   // 6:30pm
 
console.log(`${SURGERY_NAME} - script loaded`);

const Now = new Date();
const currentHour = Now.getHours()
const surgeryOpeningDuration = CLOSING_HOUR - OPENING_HOUR;
const isWeekend = Now.getDay() === 0 || Now.getDay() === 6;
const isWithinHours = currentHour >= OPENING_HOUR && currentHour < CLOSING_HOUR;
const isOpen = !isWeekend && isWithinHours;

const statusMessage = isOpen ? 'Northfield Surgery is open now. Call us at 1752 000000.' : 'Northfield Surgery is closed now. We open at '+ String(OPENING_HOUR).padStart(2,'0') + ':00';
console.log(statusMessage);
const typedCount = '3'
// these show the need of specifiying the type of a variable when doing arithmetic operations
console.log(typedCount + 1); 
console.log(typeof typedCount + 1);
console.log(Number(typedCount) + 1);
console.log(typeof(Number(typedCount) + 1));
// ---------------------------------------------------------


