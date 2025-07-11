import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', booksRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
