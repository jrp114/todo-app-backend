const express = require('express');
const cors = require('cors');
const { todos } = require('./routes');

const port = 8501;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos', todos);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
