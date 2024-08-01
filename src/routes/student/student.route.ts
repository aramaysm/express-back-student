import express from 'express';

// Controller
import studentController from '../../controllers/student.controller';


const router = express.Router();

router.get(
  '/',
  studentController.list,
);

router.post(
  '/',
  studentController.create,
);

router.put(
  '/:id',  
  studentController.update,
);

router.delete(
  '/:id',  
  studentController.remove,
);
router.delete(
  '/multiple/:ids',  
  studentController.removeMultiple,
);

export default router;
