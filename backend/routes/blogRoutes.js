const router        = require('express').Router();
const multer        = require('multer');

const Blog          = require('../app/controllers/blogController');
const authService   = require('../app/services/Auth');

const storage   = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/uploads');
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload    = multer({storage: storage});

/** add blog */
router.post('/', upload.single('thumbnail'), Blog.add);

/** update blog */
router.post('/:bid', upload.single('thumbnail'), Blog.update);

/** list blog */
router.get('/', Blog.list);

/** get blog by id */
router.get('/:bid', Blog.get);

/** delete blog */
router.delete('/:bid', Blog.delete);

module.exports = router;
