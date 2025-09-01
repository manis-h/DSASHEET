const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dsaRoutes = require('./routes/dsa');
const { seedData } = require('./seed');
const mongolink = process.env.MONGO_URI
const app = express();
app.use(require('morgan')('dev'));
app.use(cors(
    {
        // origin: 'http://localhost:',
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(express.json());

mongoose.connect(mongolink);

app.use('/api/auth', authRoutes);
app.use('/api/dsa', dsaRoutes);
app.get('/', (req, res) => res.send('API is running'));
// seedData()
app.listen(3000, () => console.log('Server running on port 3000'));
