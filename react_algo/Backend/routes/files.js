const express = require('express');
const multer = require('multer');
const FileController = require('../controllers/FileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', FileController.getFiles);
router.post('/', upload.single('file'), FileController.uploadFile);
router.delete('/:id', FileController.deleteFile);

module.exports = router;