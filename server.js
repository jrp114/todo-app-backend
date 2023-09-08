const express = require('express');
const cors = require('cors');
const { todos, comments } = require('./routes');

const port = 8501;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos', todos);
app.use('/comments', comments);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
