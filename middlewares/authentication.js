const jwt = require('jsonwebtoken');

const Authentication = (req, res, next) => {
	const authHeader = req.headers?.authorization;

	let result;

	if (authHeader) {
		const token = req.headers['authorization'].split(' ')[1]; // Bearer <token>
		const options = {
			expiresIn: '1d',
			// issues: 'https://localhost:8080'
		};

		try {
			// verify if token hasn't expired  
			result = jwt.verify(token, process.env.JWT_KEY, options);

			// pass back the decoded token to the request object
			req.user = result;

			// pass execution to the next middleware
			next();
		} catch (error) {
			// console.log('Error', error);
			// throw an error if anything goes wrong with the verification
			res.status(400);
			return res.json({ message: 'Invalid token', status: 400 });
			// throw new Error(error);
		}
	} else {
		result = {
			error: 'Authentication error. Token required',
			status: 401
		};
		res.status(401).json(result);
	}
};



module.exports = Authentication