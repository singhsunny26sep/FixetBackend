import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import routes from "./src/routes/index.js";

import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Auto-mounted Routes
app.use("/api", routes);

// Error Handler
app.use(errorHandler);

// HTTP Server for Socket.io
const httpServer = createServer(app);

// SOCKET.IO SETUP
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// ⭐ Socket.io Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Staff Live Location Emit
  socket.on("staff-location", (data) => {
    // data: { staffId, lat, lng, bookingId }
    console.log("Live Location:", data);

    // Send location to the customer
    io.to(data.bookingId).emit("tracking-update", {
      staffId: data.staffId,
      lat: data.lat,
      lng: data.lng,
    });
  });

  // Join booking room (for customer)
  socket.on("join-booking", (bookingId) => {
    socket.join(bookingId);
    console.log(`User joined booking room: ${bookingId}`);
  });

  // Booking Status Updates
  socket.on("status-update", (data) => {
    // data = { bookingId, status }
    io.to(data.bookingId).emit("status-updated", data.status);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// SERVER START
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
