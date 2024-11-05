const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="options">Choose an option:</label>
      <select id="options" name="options" required>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      <br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, options } = req.body;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail address
      pass: 'your-email-password'     // Your Gmail password or app password
    }
  });

  // Email options
  const mailOptions = {
    from: 'your-email@gmail.com', // Your Gmail address
    to: 'recipient-email@gmail.com', // Recipient's email address
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSelected Option: ${options}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Error: ' + error.toString());
    }
    res.send('Form submitted and email sent successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
