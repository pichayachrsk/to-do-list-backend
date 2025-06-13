import express from 'express';
import toDoListRoutes from './routes/toDoListRoute';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/to-do-list', toDoListRoutes);

app.listen(port, () => {
  console.log(`To-do-list app listening on port ${port}`)
});
