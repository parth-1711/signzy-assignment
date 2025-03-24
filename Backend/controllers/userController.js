const User = require('../models/User');

// Get Users (search)
exports.getUsers = async (req, res) => {
  const { search } = req.query;
  try {
    const users = await User.find({
      username: { $regex: search, $options: 'i' }
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Send Friend Request
exports.sendRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(id);

    if (!receiver) return res.status(404).json({ msg: 'User not found' });
    if (receiver.friendRequests.includes(sender._id)) {
      return res.status(400).json({ msg: 'Request already sent' });
    }

    receiver.friendRequests.push(sender._id);
    await receiver.save();

    res.json({ msg: 'Friend request sent' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Accept Friend Request
exports.acceptRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const receiver = await User.findById(req.user.id);
    const sender = await User.findById(id);

    if (!receiver.friendRequests.includes(sender._id)) {
      return res.status(400).json({ msg: 'No such request' });
    }

    receiver.friends.push(sender._id);
    sender.friends.push(receiver._id);

    receiver.friendRequests = receiver.friendRequests.filter(reqId => reqId.toString() !== sender._id.toString());

    await receiver.save();
    await sender.save();

    res.json({ msg: 'Friend request accepted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Recommend Friends
exports.recommendFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    const friendsOfFriends = new Set();

    for (let friend of user.friends) {
      const friendData = await User.findById(friend._id).populate('friends');
      friendData.friends.forEach(f => {
        if (f._id.toString() !== user._id.toString() &&
            !user.friends.includes(f._id)) {
          friendsOfFriends.add(f);
        }
      });
    }

    res.json(Array.from(friendsOfFriends));
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friendRequests', 'username');
    
    res.json({
      requests: user.friendRequests
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  const senderId = req.params.id;

  try {
    const receiver = await User.findById(req.user.id);

    if (!receiver) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const requestExists = receiver.friendRequests.includes(senderId);

    if (!requestExists) {
      return res.status(400).json({ msg: 'No friend request from this user' });
    }

    // Remove the friend request
    receiver.friendRequests = receiver.friendRequests.filter(
      (reqId) => reqId.toString() !== senderId
    );

    await receiver.save();

    res.json({ msg: 'Friend request rejected successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFriendsList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      friends: user.friends
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

