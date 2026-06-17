const depots = [
  { id: 1, mechanicHours: 60 },
  { id: 2, mechanicHours: 135 },
  { id: 3, mechanicHours: 188 },
  { id: 4, mechanicHours: 97 }
];

const vehicles = [
  { duration: 1, impact: 3 },
  { duration: 6, impact: 5 },
  { duration: 2, impact: 10 },
  { duration: 8, impact: 7 },
  { duration: 3, impact: 7 },
  { duration: 3, impact: 5 },
  { duration: 2, impact: 10 },
  { duration: 4, impact: 7 },
  { duration: 6, impact: 2 },
  { duration: 2, impact: 9 },
  { duration: 4, impact: 3 },
  { duration: 1, impact: 5 },
  { duration: 2, impact: 10 },
  { duration: 1, impact: 2 },
  { duration: 1, impact: 6 },
  { duration: 1, impact: 4 },
  { duration: 8, impact: 7 },
  { duration: 7, impact: 9 },
  { duration: 8, impact: 7 },
  { duration: 5, impact: 1 },
  { duration: 8, impact: 4 },
  { duration: 5, impact: 4 },
  { duration: 6, impact: 3 },
  { duration: 5, impact: 5 },
  { duration: 5, impact: 8 },
  { duration: 3, impact: 2 },
  { duration: 8, impact: 8 },
  { duration: 6, impact: 4 },
  { duration: 8, impact: 5 },
  { duration: 7, impact: 7 },
  { duration: 5, impact: 9 }
];

const totalHours = vehicles.reduce((s,v)=>s+v.duration,0);
const totalImpact = vehicles.reduce((s,v)=>s+v.impact,0);

const bestDepot = depots.reduce((a,b)=>
  a.mechanicHours > b.mechanicHours ? a : b
);

console.log("Best Depot:", bestDepot.id);
console.log("Available Hours:", bestDepot.mechanicHours);
console.log("Total Vehicle Hours:", totalHours);
console.log("Total Impact:", totalImpact);
console.log("Vehicles Selected:", vehicles.length);