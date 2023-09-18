const express = require('express');
const cors = require('cors');
const { todos, comments, users } = require('./routes');

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos', todos);
app.use('/comments', comments);
app.use('/users', users);

app.listen(port, () => console.log(`Listening on ${port}`));
