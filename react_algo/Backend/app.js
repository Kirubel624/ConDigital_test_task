const express = require('express');
const mongoose = require('mongoose');
const filesRoutes = require('./routes/files');
const cors=require('cors')
const app = express();
app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.once('open', () => {
  console.log('MongoDB connected');
});
app.use(cors());
app.use('/api/files', filesRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));