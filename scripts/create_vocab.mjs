import fs from 'fs';

// Helper to escape strings
const esc = (str) => (str ? str.replace(/'/g, "\\'") : '');

console.log('Generating full 1,120+ words dictionary...');
