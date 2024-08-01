import * as express from 'express';

import defaultRouter from './default/default.route';
import studRouter from './student/student.route';
import gradeRouter from './grade/grade.route';


const router = express.Router();

router.use('/', defaultRouter);
router.use('/student', studRouter);
router.use('/grade', gradeRouter);

export default router;
