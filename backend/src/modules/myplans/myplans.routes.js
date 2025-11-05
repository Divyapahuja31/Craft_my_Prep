import express from 'express';
import * as myPlansController from './myplans.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';


export const userRouter = express.Router();
userRouter.get('/:userId/plans', requireAuth, myPlansController.getUserPlans);

export const planRouter = express.Router();
planRouter.get('/:planId', requireAuth, myPlansController.getPlan);

