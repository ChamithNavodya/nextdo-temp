function checkMissingFields(req, res, requiredFields) {
  const missingFields = [];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `${missingFields.join(", ")} ${
        missingFields.length > 1 ? "are" : "is"
      } required.`,
      data: null,
    });
  }

  return null; // No missing fields
}

module.exports = { checkMissingFields };