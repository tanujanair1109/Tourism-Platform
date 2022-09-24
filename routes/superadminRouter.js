import express from 'express';

import { loginUser, registerUser, userProfile} from '../controllers/userController.js';

import {addPlace, addCSV, getPlaces} from '../controllers/placeController.js';

import tokenCheck from '../middleware/tokenCheck.js';

const router = express.Router();

// //////FILE UPLOAD///////////////
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import multer from "multer";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/assets/csv'));
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({storage:storage});
// ///////////////////////////////


router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/superadmin-profile',tokenCheck.isSuperadmin, userProfile);

router.post('/add-place',tokenCheck.isSuperadmin, addPlace);

router.post('/add-csv',tokenCheck.isSuperadmin,upload.single('file'),addCSV);

router.get('/places-list', getPlaces);

export default router;
