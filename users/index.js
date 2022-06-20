const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const auth = require('./middleware/auth');
const userExist = require('./middleware/userExist');
const createToken = require("./utils/token");

const PORT = 8081;
const app = express();
app.use(express.json());
app.use(cors());

const dbUrl = 'mongodb://0.0.0.0:27017/fiapUsers';


mongoose.connect(dbUrl, {
  useNewurlParser: true,
  useUnifiedTopology: true
});

app.get("/users", auth, async (_, response) => {
  const users = await User.find({});
  response.json({ data: users });
});

app.post('/users', userExist , (request, response) => {
  const user = new User(request.body);
  user.save().then((data) =>
    (response.status(201).json({ message: "User created successfully.", data }))
  ).catch((error) =>
    (response.status(400).json({ message: `${error}` }))
  );
});


app.post('/users/changepassword',async  (request, response) => {
  const { username, currentPassword, confirmPassword, newPassword } = request.body;

  if (!username || !currentPassword || !confirmPassword || !newPassword) {
    return response.status(400).json({ message: "Fill in all fields." });
  }

  if (newPassword !== confirmPassword) {
    return response.status(400).json({ message: "New Passwords do not match." });
  }

  if (newPassword.length < 6 || confirmPassword.length < 6) {
    return response.status(400).json({ message: "Password should be at 6 characters."})
  }

  User.findOne({ username }).then(async (user) => {
    if (user === null) {
      return response.status(404).json({ message: "User not found."})
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (isMatch) {
      user.password = newPassword;
      user.save().then(() => (
        response.status(200).json({ message: "Password changed successfully." })
      )).catch((error) => {
        response.status(400).json({
          message: `${error}`
        })
      });
    } else {
      return response.status(400).json({ message: "Password is invalid."})
    }
  });
});

app.post('/login', (request, response) => {
  const { username, password } = request.body;

  User.findOne({ username }, async  (error, data) => {
    if (error) return response.status(400).send({ message: "Find user error" });
    if (!data) return response.status(404).send({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, data.password);
    console.log(isMatch)
    if (isMatch) {
      console.log(data)
      const token = createToken(data._id, data.username);
      return response.status(200).send({ message: `Authenticated`, token })
    }
    return response.status(400).send({ message: "User/Password invalid" });
  })
});

app.listen(PORT, () => (`Server started 🚀 http://localhost:${PORT}`));