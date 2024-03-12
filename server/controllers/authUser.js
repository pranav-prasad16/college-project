const login = (req, res) => {
  const { email, password } = req.body;
  try {
    const token = 'dummy_token';

    return res.status(201).json({ token });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { login };
