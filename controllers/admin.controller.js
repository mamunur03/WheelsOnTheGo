const User = require('../models/user.model');

const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await User.find({ isPending: true }, 'username role');
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching pending requests' });
  }
};

const approvePendingRequest = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isPending = false;
    await user.save();

    res.status(200).json({ message: 'Pending request approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while approving the pending request' });
  }
};

const deletePendingRequest = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and remove
    const removedUser = await User.findByIdAndRemove(userId);
    res.status(200).json(removedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the request' });
  }
};

module.exports = {
  getPendingRequests,
  approvePendingRequest,
  deletePendingRequest,
};