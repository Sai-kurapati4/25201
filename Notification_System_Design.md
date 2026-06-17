# Notification System Design

## Stage 1

### Notification APIs

#### Get Notifications

GET /api/notifications

Response

{
  "notifications": [
    {
      "id": 1,
      "title": "Placement Drive",
      "message": "TCS hiring for 2027 batch",
      "type": "Placement",
      "isRead": false,
      "createdAt": "2026-06-17T10:00:00Z"
    }
  ]
}

#### Mark Notification as Read

PUT /api/notifications/{id}/read

Response

{
  "message": "Notification marked as read"
}

#### Delete Notification

DELETE /api/notifications/{id}

Response

{
  "message": "Notification deleted successfully"
}

#### Send Notification

POST /api/notifications

Request

{
  "title": "Placement Drive",
  "message": "TCS hiring for 2027 batch",
  "type": "Placement"
}

Response

{
  "message": "Notification created successfully"
}

### Real Time Notification Mechanism

WebSocket can be used for real-time notification delivery. Whenever a new notification is created, the server pushes the notification directly to connected users without requiring page refresh.

### Headers

Authorization: Bearer Token

Content-Type: application/json
## Stage 2

To store notification data, I would use PostgreSQL since notifications have a structured format and need reliable storage. Each notification belongs to a student, so a relational database is suitable for maintaining those relationships.

I like to  create two tables: one for students and another for notifications. The notifications table would store fields such as notification ID, student ID, notification type, message, read status, and timestamp.

As the number of notifications increases, performance may become a concern. To handle this, I prfer adding indexes on frequently searched fields like studentId and createdAt. Pagination can also be used so that only a limited number of notifications are loaded at a time instead of fetching everything together. Old notifications can archived to reduce the size of the active table.

Example query:

SELECT * FROM notifications
WHERE studentId = 1042
ORDER BY createdAt DESC;

## Stage 3

The given query can become slow because the notifications table contains millions of records. Without proper or good  indexing, the database has to scan a large portion of the table before finding the required unread notifications.

To improve performance, I would create a composite index on studentId, isRead, and createdAt. This allows the database to quickly locate unread notifications for a specific student and return the results in the required order.

I would not like to  recommend creating indexes on every column. Although indexes improve read performance, they increase storage usage and slow down insert and update operations.

To find students who received placement notifications in the last seven days, I would use a query that filters based on notification type and timestamp. With proper indexing, the execution cost will be much lower.

 ## Stage 4

Fetching notifications from the database every time a page is loaded can put unnecessary pressure on the database, especially when the number of students is very large.

One improvement would be to use caching for frequently accessed notifications. Another approach is pagination, where notifications are loaded in smaller batches instead of all at once. Real-time technologies such as WebSockets can also help by sending only new notifications instead of repeatedly requesting the same data.

The advantage of caching is faster response time, but it introduces additional complexity because cached data must stay synchronized with the database. Pagination reduces database load but requires extra handling on the client side. WebSockets provide a better user experience but require persistent connections.

## Stage 5

The current implementation processes notifications one student at a time. For a small number of users this works, but sending notifications to 50,000 students would take a long time and is vulnerable to failures.

If the email service fails after processing some students, the remaining students may never receive the notification. This makes the solution unreliable.

A better design would be to first save the notification in the database and then place notification jobs into a message queue. Worker services can process these jobs independently and send emails in parallel. Failed jobs can be retried automatically without affecting the rest of the system.

This approach improves reliability, scalability, and overall performance.

## Stage 6

To display the most important notifications first, I would assign a priority score to each notification. Placement notifications would have the highest priority, followed by result notifications and then event notifications. Recent notifications would also receive a slightly higher score than older ones.

For maintaining the top 10 notifications efficiently, I used a priority-based approach in the implementation. Whenever a new notification arrives, its priority score is calculated and compared with the existing notifications. This ensures that only the most important notifications remain in the top 10 list.

The implementation for this stage is available in the file:

services/notificationPriority.js

The corresponding output screenshot has also been uploaded to the repository.