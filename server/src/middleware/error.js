function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'A record with that unique value already exists' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
}

module.exports = { asyncHandler, errorHandler };
