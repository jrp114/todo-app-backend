import cors from 'cors';
import express from 'express';
import { comments, todos, users } from './routes';

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos', todos);
app.use('/comments', comments);
app.use('/users', users);

app.listen(port, () => console.log(`Listening on ${port}`));
