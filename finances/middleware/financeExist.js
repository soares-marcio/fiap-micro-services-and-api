const Finance = require('../models/finance');

async function verifyDuplicate(request, response, next) {
  const { bankName, accountType } = request.body;
  const finance = await Finance.exists({ bankName, accountType });
  if (finance !== null) {
    return response.status(422).json({ message: 'Finance already exists.'})
  }
  return next();
}

module.exports = verifyDuplicate;