require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth.routes');
const dataRoutes = require('./routes/data.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gearguard';
    await mongoose.connect(mongoUri);

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    // attach io to app so controllers can emit
    app.set('io', io);

    server.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
