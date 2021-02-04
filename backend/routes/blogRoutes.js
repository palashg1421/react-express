const router    = require('express').Router();
const Blog      = require('../app/controllers/blogController');
const jwt       = require('jsonwebtoken');
const multer    = require('multer');

const storage   = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/uploads');
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload    = multer({storage: storage});

/** Authorization token check */
router.use((req, res, next) => {
    const method = req.method;
    const token = req.headers.authorization;

    if( method === "POST" || method === "DELETE" )
    {
        if(token)
        {
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if(err)
                {
                    res.send(200).json({
                        message:    "Session time out. Please login to continue.",
                        status:     0,
                        data:       [],
                        error:      ''
                    });
                }
                else
                    next();
            });
        }
        else
        {
            res.send(200).json({
                message:    "Authorization token in missing from the request.",
                status:     0,
                data:       [],
                error:      ''
            });
        }
    }
    next();
});

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
