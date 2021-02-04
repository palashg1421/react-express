const Blog      = require('../models/blogModel');

exports.add = (req, res) => {
    let imageUrl = 'assets/images/default-blog.jpg';
    if(req.file)
        imageUrl = req.file.path;

    const blog = new Blog({
        title:       req.body.title,
        content:     req.body.content,
        thumbnail:   imageUrl,
        author:      ''
    });

    blog.save().then( blog => {
        res.status(200).json({
            message:    'Blog added successfully',
            status:     1,
            data:       blog,
            error:      ''
        });
    }).catch( err => {
        res.status(200).json({
            message:    'Unable to add blog',
            status:     0,
            data:       [],
            error:      err
        });
    });
}

exports.list = (req, res) => {
    Blog.find().then(blogs => {
        if( blogs != '' )
        {
            res.status(200).json({
                message:    'Blog listed successfully',
                status:     1,
                data:       blogs,
                error:      ''
            });
        }
        else
        {
            res.status(200).json({
                message:    'No record found',
                status:     0,
                data:       [],
                error:      ''
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Internal server error',
            status: 0,
            data: '',
            error: err
        });
    });

}

exports.get = (req, res) => {
    Blog.findById(req.params.bid).then( blog => {
        if( blog!= '')
        {
            res.status(200).json({
                message:    'Blog found successfully',
                status:     1,
                data:       blog,
                error:      ''
            });
        }
        else
        {
            res.status(200).json({
                message:    'Unable to find the blog',
                status:     0,
                data:       blog,
                error:      ''
            });
        }
    }).catch( err => {
        res.status(500).json({
            message: 'Internal server error',
            status: 0,
            data: [],
            error: err
        });
    });
}

exports.delete = (req, res) => {
    Blog.deleteOne({_id: req.params.bid}).then( blog => {
        res.status(200).json({
            message: "Blog deleted successfully",
            status: 1,
            data: blog,
            error: ''
        });
    }).catch( err=> {
        res.status(500).json({
            message: "Internal server error",
            status: 0,
            data: '',
            error: err
        });
    });
}

exports.update = (req, res) => {
    let data = {
        title:      req.body.title,
        content:    req.body.content
    }
    if(req.file)
    {
        data = {
            title:      req.body.title,
            content:    req.body.content,
            thumbnail:  req.file.path
        }
    }

    Blog.updateOne({_id: req.params.bid}, data).then( blog => {
        res.status(200).json({
            message:    "Blog updated successfully",
            status:     1,
            data:       blog,
            error:      ''
        });
    }).catch( err => {
        res.status(200).json({
            message:    "Internal server error",
            status:     0,
            data:       '',
            error:      err
        });
    });
    
}
