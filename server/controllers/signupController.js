const User = require('../models/users-Model');

const signup = async (req, res) => {
  const userData = req.body;

  if (
    !userData.name ||
    !userData.userName ||
    !userData.email ||
    !userData.password
  ) {
    return res.status(409).json({ msg: 'Required fields are empty' });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ msg: 'User with provided email already exist' });
    }
    const notUniqueUserName = await User.findOne({ userName });
    if (notUniqueUserName) {
      return res.status(401).json({ msg: 'Choose a different userName' });
    }
    const newUser = await User.create(userData);
    console.log(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { signup };
