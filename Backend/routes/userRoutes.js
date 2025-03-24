const express = require('express');
const router = express.Router();
const { getUsers, sendRequest, acceptRequest, recommendFriends ,getFriendRequests,rejectFriendRequest,getFriendsList} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getUsers);
router.post('/send-request/:id', authMiddleware, sendRequest);
router.post('/accept-request/:id', authMiddleware, acceptRequest);
router.get('/recommendations', authMiddleware, recommendFriends);
router.get('/friend-requests', authMiddleware, getFriendRequests)
router.post('/reject-request/:id', authMiddleware, rejectFriendRequest);
router.get('/friends', authMiddleware, getFriendsList);;

module.exports = router;
