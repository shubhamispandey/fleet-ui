# Video Conferencing App - Frontend

This repository contains the Next.js frontend application for the real-time video conferencing platform. It provides a user-friendly interface for authentication, dashboard navigation, real-time chat, and core video/audio conferencing features, including screen sharing and basic filters.

## 🚀 Technologies Used

- **Next.js:** React framework for server-side rendering, static site generation, and client-side rendering.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development and responsive design.
- **Socket.io Client:** For real-time, bidirectional communication with the backend signaling server.
- **Mediasoup Client:** JavaScript library for interacting with the Mediasoup SFU (Selective Forwarding Unit) for WebRTC media handling.
- **MediaPipe (or similar):** For client-side video processing (e.g., background blur).
- **Axios (or native Fetch API):** For making HTTP requests to the Express.js backend API.

## ✨ Features

- **Landing Page:** Engaging introduction to the application.
- **User Authentication:** Secure login and registration.
- **Dashboard:** Microsoft Teams-inspired layout with:
  - User list with real-time online/offline status.
  - Search functionality for people.
  - Basic user profile viewing and editing.
- **One-on-One Chat:** Real-time text messaging with message history.
- **Meeting Management:**
  - Create and join meetings with unique room IDs.
  - Pre-meeting device and background preview.
- **Real-time Video & Audio:**
  - Display local webcam and microphone streams.
  - Display remote participants' video and audio.
  - Mute/unmute microphone and toggle video on/off.
- **Screen Sharing:** Share and view screen content during meetings.
- **In-Meeting Chat:** Text chat integrated directly into the meeting interface.
- **Basic Screen Filters:** Client-side background blur (initial implementation).
