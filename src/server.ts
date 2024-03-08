import cors from 'cors';
import express from 'express';
import { comments, projects, taskLists, tasks, users } from './routes';

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/tasks', tasks);
app.use('/comments', comments);
app.use('/users', users);
app.use('/taskLists', taskLists);
app.use('/projects', projects);

app.listen(port, () => console.log(`Listening on ${port}`));
