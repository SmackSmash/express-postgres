import express from 'express';
import { booksTable } from '../db/schema';
import db from '../db/connect';

const router = express.Router();

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
    if (!req.body.title.length || !req.body.author.length) {
      return res.status(422).send('Please fill in the required fields');
    }
    const { title, author } = req.body;
    const response = await db.insert(booksTable).values({ title, author });
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// @route   PUT /books/:id
// @desc    Edit book by ID
// @access  Public
router.put('/', async (req, res) => {
  try {
  } catch (error) {}
});

// @route   DELETE /books/:id
// @desc    Delete book by ID
// @access  Public
router.delete('/', async (req, res) => {
  try {
  } catch (error) {}
});

export default router;
