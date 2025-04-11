const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudentById,
  getAllStudents,
  deleteStudent
} = require('../controller/StudentController');

router.post('/students', createStudent);
router.get('/students/:id', getStudentById);
router.get('/allStudents',getAllStudents);
router.delete('/delete/:id',deleteStudent);


module.exports = router;
