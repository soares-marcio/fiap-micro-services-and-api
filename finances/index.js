const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require('./middleware/auth');
const financeExist = require('./middleware/financeExist');
const Finance = require('./models/finance');

const PORT = 8082;
const app = express();
app.use(express.json());
app.use(cors());

const dbUrl = 'mongodb://mongo:27017/fiapFinance';

mongoose.connect(dbUrl, {
  useNewurlParser: true,
  useUnifiedTopology: true
});

app.get("/finances", auth, async (_, response) => {
  const finances = await Finance.find({});
  response.json({ data: finances });
});

app.post('/finances', auth, financeExist, async (request, response) => {
  const finance = new Finance(request.body);
  finance.save().then(data =>
    (response.status(201).json({ message: 'Finance created successfully', data }))
  ).catch(error =>
    (response.status(400).json({ message: `${error}` }))
  );
});

app.listen(PORT, () => (`Server started 🚀 http://localhost:${PORT}`));