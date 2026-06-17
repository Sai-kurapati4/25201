const notifications = [
  { id: 1, type: "Placement", priority: 10 },
  { id: 2, type: "Result", priority: 5 },
  { id: 3, type: "Event", priority: 3 },
  { id: 4, type: "Placement", priority: 9 },
  { id: 5, type: "Result", priority: 4 },
  { id: 6, type: "Placement", priority: 8 }
];

function getTopNotifications(data, limit = 10) {
  return data
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

const topNotifications = getTopNotifications(notifications);

console.log("Top Priority Notifications:");
console.log(topNotifications);