module.exports = [
  {
    "context": ["/room_calendar_login", "/room_calendar_logout", "/ngapimock"],
    "target": "http://localhost:3000",
    "changeOrigin": true,
    "secure": false,
    "loglevel": "rewrite"
  }
];