import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3001;
const users = [{ id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8), role: 'admin' }];
const SECRET = 'your-secret-key';

app.use(express.json());

// Authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to check the token
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    req.user = user;
    next();
  });
};

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

// Admin route with permission check
app.get('/admin', authenticateJWT, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You do not have the necessary permissions' });
  }
  res.json({ message: 'Welcome, Admin!' });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
