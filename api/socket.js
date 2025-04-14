let io;
module.exports = {
  init: (server) => {
    const { Server } = require("socket.io");
    io = new Server(server, {
      cors: {
        origin: "https://ping-me-a-live-chat-app.onrender.com",
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket not initialized");
    }
    return io;
  },
};
