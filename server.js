// server.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // folder untuk file frontend

// Session sederhana untuk autentikasi admin
app.use(session({
  secret: 'rahasia123',
  resave: false,
  saveUninitialized: true,
}));

// Data buku disimpan di memori (bisa diganti DB)
let books = [];

// Middleware autentikasi admin sederhana
function isAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Login admin sederhana (username: admin, password: admin123)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Login gagal' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// API untuk mendapatkan data buku
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Setup multer untuk upload file Excel/CSV
const upload = multer({ dest: 'uploads/' });

// API upload file Excel/CSV (hanya admin)
app.post('/api/upload', isAdmin, upload.single('file'), (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Contoh format data: [{judul: '...', penulis: '...', tahun: 2020, kategori: '...'}, ...]
    books = data.map(item => ({
      judul: item.Judul || '',
      penulis: item.Penulis || '',
      tahun: item.Tahun || '',
      kategori: item.Kategori || '',
    }));

    res.json({ success: true, message: 'Data buku berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memproses file' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});