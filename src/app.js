require('dotenv').config();
require('newrelic');

const express = require('express');
const askRoute = require('./routes/ask');

const app = express();
app.use(express.json());

app.use('/ask', askRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFF rodando na porta ${PORT}`));
