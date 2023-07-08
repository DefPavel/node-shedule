import { Router } from 'express';
const router = Router();
import usersRoutes from './users/index.js';
import rolesRoutes from './roles/index.js';
import scheduleRoutes from './schedule/index.js';

router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/schedule', scheduleRoutes);

export default router;
