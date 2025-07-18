import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // อนุญาตให้ frontend สามารถเรียก API ได้
app.use(express.json());

// ข้อมูลการเชื่อมต่อฐานข้อมูล
// *** กรุณาแก้ไขข้อมูลในส่วนนี้ให้ตรงกับของคุณ ***
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // เปลี่ยนเป็น username ของคุณ
  password: '1234', // เปลี่ยนเป็น password ของคุณ
  database: 'jf-website', // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
});

// เชื่อมต่อกับฐานข้อมูล
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Successfully connected to MySQL database as id ' + db.threadId);
});

// Endpoint สำหรับดึงข้อมูล Categories
app.get('/api/categories', (req, res) => {
  const sql = "SELECT cgt_id, cgt_name FROM categories";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Failed to fetch categories' });
      return;
    }
    // ส่งข้อมูลที่ได้จากฐานข้อมูลกลับไปเป็น JSON
    res.json(results);
  });
});

// Endpoint สำหรับดึงข้อมูล Partners
app.get('/api/partners', (req, res) => {
  const sql = "SELECT pnt_id, pnt_name, pnt_logo FROM partners";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching partners:', err);
      res.status(500).json({ error: 'Failed to fetch partners' });
      return;
    }
    res.json(results);
  });
});

// Endpoint สำหรับดึงข้อมูล Products
app.get('/api/products', (req, res) => {
  // Query ทุกคอลัมน์ที่จำเป็นสำหรับหน้า ProductsPage
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
      return;
    }
    res.json(results);
  });
});

// เริ่มต้น Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});