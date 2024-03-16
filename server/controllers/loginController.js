const User = require('../models/users-Model');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(409).json({ msg: 'Required fields are empty' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: 'User with provide email does not exist' });
    }
    if (user.password !== password) {
      return res.status(401).json({ msg: 'Password entered does not match' });
    }
    const token = 'dummy_token';

    return res.status(201).json({ token });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { login };
