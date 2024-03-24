// app.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const users = [];

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
    console.log(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Signin successful', user: { username: user.username, email: user.email } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
