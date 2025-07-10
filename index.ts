import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('Hello there!');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
