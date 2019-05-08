const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = function(req, res) {
	const { email, password } = req.body;

	User.findOne({ email })
		.then(user => {
			if (user) {
				return res.status(422).send({ error: "User already exists" });
			}

			bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						email,
						password: hashedPassword
					});
					user
						.save()
						.then(result => {
							return res
								.status(201)
								.json({ message: "User created Successfully" });
						})
						.catch(error => {
							return res.status(422).send({ error });
						});
				})
				.catch(error => {
					return res.status(500).send({ error: "Hashing failed" });
				});
		})
		.catch(error => {
			return res.status(400).send({ error });
		});
};

exports.auth = function(req, res) {
	const { email, password } = req.body;

	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.status(404).send({ error: "User doesn't exist" });
			}

			bcrypt
				.compare(password, user.password)
				.then(result => {
					if (result) {
						const token = jwt.sign(
							{
								userId: user._id,
								email: user.email
							},
							"secret",
							{ expiresIn: 45 * 60 }
						);
						return res.status(200).json({ token });
					} else {
						return res.status(422).send({ error: "Wrong email or password" });
					}
				})
				.catch(error => {
					return res.status(422).send({ error });
				});
		})
		.catch(error => {
			return res.status(400).send({ error });
		});
};

exports.authMiddleware = function(req, res, next) {
	const header = req.headers.authorization;

	if (header) {
		let token;
		try {
			token = jwt.verify(header.split(" ")[1], "secret");
		} catch (err) {
			return res.status(500).send({ err });
		}
		User.findById(token.userId)
			.then(user => {
				res.locals.user = user;
				next();
			})
			.catch(err => {
				return res.status(401).send({ error: "Not Authorized" });
			});
	} else {
		return res.status(401).send({ error: "Not Authorized" });
	}
};
