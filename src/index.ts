import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { booksTable } from './db/schema';

const app = express();
app.use(express.json());
const db = drizzle(process.env.DATABASE_URL!);

console.log(process.env.DATABASE_URL);

app.get('/', async (req, res) => {
  try {
    const books = await db.select().from(booksTable);
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/add', async (req, res) => {
  try {
    console.log(req.body);
    const response = await db.insert(booksTable).values({
      title: '2001 - A Space Oddysey',
      author: 'Arthhus C. Clarke'
    });
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
