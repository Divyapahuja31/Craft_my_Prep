import express from 'express';
import * as myPlansController from './myplans.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();


router.get('/:userId/plans', requireAuth, myPlansController.getUserPlans);

export default router;
