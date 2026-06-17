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