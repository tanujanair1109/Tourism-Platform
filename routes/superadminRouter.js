import express from 'express';
import { loginSuperAdmin, registerSuperAdmin, superadminProfile,
        addPlace, getPlaces }
        from '../controllers/superadminController.js';

const router = express.Router()

router.post('/register',registerSuperAdmin);

router.post('/login', loginSuperAdmin);

router.post('/add-place',addPlace);

router.get('/superadmin-profile',superadminProfile);

router.get('/places-list', getPlaces);

export default router;
