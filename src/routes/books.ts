import express from 'express';
import { booksTable } from '../db/schema';
import db from '../db/connect';
import { eq } from 'drizzle-orm';
import * as z from 'zod';

const router = express.Router();

const Book = z.object({
  title: z.string().min(1),
  author: z.string().min(1)
});

// @route   GET /books
// @desc    Get all books
// @access  Public
router.get('/', async (_req, res) => {
  try {
    const books = await db.select().from(booksTable);
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// @route   POST /books
// @desc    Add book to list
// @access  Public
router.post('/', async (req, res) => {
  try {
    Book.parse(req.body);
    const { title, author } = req.body;
    const response = await db.insert(booksTable).values({ title, author });
    res.send(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues);
    } else {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
});

// @route   PUT /books/:id
// @desc    Edit book by ID
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const [book] = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, Number(req.params.id)));
    console.log(book);
    if (!book) {
      res.status(404).send(`No book with id: ${req.params.id}`);
    }
  } catch (error) {}
});

// @route   DELETE /books/:id
// @desc    Delete book by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
  } catch (error) {}
});

export default router;
