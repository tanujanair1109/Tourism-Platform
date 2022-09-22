import express from 'express';

import { loginUser, registerUser, userProfile} from '../controllers/userController.js';

import {addPlace, getPlaces} from '../controllers/placeController.js';

import tokenCheck from '../middleware/tokenCheck.js';

const router = express.Router()

router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/superadmin-profile',tokenCheck.isSuperadmin, userProfile);

router.post('/add-place',tokenCheck.isSuperadmin, addPlace);

router.get('/places-list', getPlaces);

export default router;
