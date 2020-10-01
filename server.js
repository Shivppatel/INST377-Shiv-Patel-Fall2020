// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
  })
  .post((req, res) => {
    console.log('POST request detected');
<<<<<<< HEAD
    console.log('Form data in res.body', req.body)
    res.status(200).send('Hello World!')
=======
    console.log('Form data in res.body', req.body);
>>>>>>> e29798076ab6c260c8053bfd5b9a60fe615e201f
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
