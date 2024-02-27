import cors from 'cors';
import express from 'express';
import { comments, projects, todos, users } from './routes';

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos', todos);
app.use('/comments', comments);
app.use('/users', users);
app.use('/projects', projects);

app.listen(port, () => console.log(`Listening on ${port}`));
