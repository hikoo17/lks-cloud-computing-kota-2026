const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// READ: Tampilkan Data
app.get('/', (req, res) => {
  db.query('SELECT * FROM items ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.render('index', { items: results });
  });
});

// CREATE: Tambah Data
app.post('/add', (req, res) => {
  const { nama, keterangan } = req.body;
  db.query('INSERT INTO items (nama, keterangan) VALUES (?, ?)', [nama, keterangan], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

// DELETE: Hapus Data
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});