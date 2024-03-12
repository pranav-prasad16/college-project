const signup = (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log({ name, email, password });
    return res
      .status(201)
      .json({ user: { name, email }, msg: 'User created successfully' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { signup };
