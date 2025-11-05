import express from 'express';
import * as generateController from './generate.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate', requireAuth, generateController.preview);
router.post('/', requireAuth, generateController.save);

export default router;
