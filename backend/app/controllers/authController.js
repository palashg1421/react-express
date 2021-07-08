const User      = require('../models/userModel');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

exports.login = (req, res) =>
{
	User.findOne({email: req.body.email}).then( async user =>
	{
		if(user)
		{
			const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
			if( isPasswordValid )
			{
				const payload = {
					name: user.name,
					city: user.city,
					mobile: user.mobile,
					email: user.email
				}
				const token = jwt.sign({
					data: payload,
					exp: Math.floor(Date.now() / 1000) + (60 * 60)
				}, process.env.JWT_SECRET)
				res.status(200).json({
					message:    "Login successfully",
					status:     1,
					data:       token,
					error:      ''
				});
			}
			else
			{
				res.status(200).json({
					message:    "Invalid username or password",
					status:     0,
					data:       [],
					error:      ''
				});
			}
		}
		else
		{
			res.status(200).json({
				message:    "Invalid username or password",
				status:     0,
				data:       [],
				error:      ''
			});
		}
	},
	errors =>
	{
		console.log(errors);
		res.status(500).json({
			message:    "Internal server error",
			status:     0,
			data:       ''
		});
	})
}

exports.signup = (req, res) =>
{
	const user = new User({
		name:       req.body.name,
		city:       req.body.city,
		mobile:     req.body.mobile,
		email:      req.body.email,
		password:   req.body.password
	});
	user.save().then( user => {
		res.status(200).json({
			message:    "User register successfully.",
			status:     1,
			data:       user
		});
	}).catch( err => {
		res.status(200).json({
			message:    "Registration failed",
			status:     0,
			data:       ''
		});
	});
}
