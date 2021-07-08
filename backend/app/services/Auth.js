const jwt           = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err)
            {
                const data = {
                    message:    err.message,
                    status:     0,
                    data:       [],
                    error:      ''
                };
                console.log(data);
                res.sendStatus(200).json(data);
            }
            else
            {
                next();
            }
        });
    }
    else
    {
        res.sendStatus(200).json({
            message:    "Authorization token in missing from the request.",
            status:     0,
            data:       [],
            error:      ''
        });
    }
}
