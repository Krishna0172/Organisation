const client = require('./config/connection');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

client.connect();
app.listen(PORT, () => {
  console.log(`Listening to the ${PORT}`);
});

app.get('/', (req, res) => {
  return res.send('Working...');
});

app.use('/data', require('./routes/org_routes'));
