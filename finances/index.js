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

app.post('/finances', auth, financeExist, (request, response) => {
  const finance = new Finance(request.body);
  finance.save().then(data =>
    (response.status(201).json({ message: 'Finance created successfully', data }))
  ).catch(error =>
    (response.status(400).json({ message: `${error}` }))
  );
});

app.put('/finances/:id', auth, async (request, response) => {
  Finance.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }, (error, data) => {
    if (data === null) return response.status(404).send({ error: 'Finance not found' });
    if (error) return response.status(400).json({ message: `${error}` });
    return response.status(200).json({ message: 'Finance updated successfully', data })
  });
});

app.listen(PORT, () => (`Server started 🚀 http://localhost:${PORT}`));
