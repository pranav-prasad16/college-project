const Doubt = require('../models/doubt-Model');

const getDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.find();
    if (!doubt) {
      return res.status(404).json({ msg: 'No doubts found' });
    }
    return res.status(200).json({ doubt });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const postDoubt = async (req, res) => {
  const doubtData = req.body;
  const existingDoubt = await Doubt.findOne({ title: doubtData.title });

  if (existingDoubt) {
    return res.status(400).json({ msg: 'Already present' });
  }
  try {
    const newDoubt = await Doubt.create(doubtData);
    return res.status(201).json(newDoubt);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const patchDoubt = async (req, res) => {
  const { doubtId } = req.params;
  const doubtData = req.body;
  try {
    const patchDoubt = await Doubt.findByIdAndUpdate(doubtId, doubtData, {
      new: true,
    });
    if (!patchDoubt) {
      return res.status(404).json({ msg: 'Doubt not found' });
    }
    return res.status(201).json({ msg: 'Doubt patched successfully' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const deleteDoubt = async (req, res) => {
  const { doubtId } = req.params;
  try {
    const deleteDoubt = await Doubt.findByIdAndDelete(doubtId);
    if (!deleteDoubt) {
      return res.status(404).json({ msg: 'Doubt not found' });
    }
    return res.status(201).json({ msg: 'Deleted doubt successfully' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { getDoubt, postDoubt, patchDoubt, deleteDoubt };
