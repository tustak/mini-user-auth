var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();

app.get('/api', function(req, res) {
	// Authenticate user
	res.json({
		text: 'my api'
	})
})

app.post('/api/login', function(req, res) {
	let users = [
		{
			id: 1,
			username: 'andresmechali',
			firstName: 'Andres',
			lastName: 'Mechali',
			email: 'andresmechali@gmail.com',
			password: 'asd'
		},
		{
			id: 2,
			username: 'blasrodri',
			firstName: 'Blas',
			lastName: 'Rodriguez',
			email: 'rodrigblas@gmail.com',
			password: 'asd'
		}
	]
	const token = jwt.sign({ users }, 'secret_key');
	res.json({
		token: token
	})
})

app.get('/api/protected', checkToken, function(req, res) {
	jwt.verify(req.token, 'secret_key', function(err, data) {
		if (err) {
			res.sendStatus(403);
		}
		else {
			res.json({
				text: 'this is protected',
				data: data
			})
		}
	});
	res.json({
		text: 'protected view'
	})
})

function checkToken(req, res, next) {
	const token = req.headers['authorization'];
	if (typeof headers !== undefined) {
		req.token = token;
		next();
	}
	else {
		res.sendStatus(403);
	}
}

app.listen(4000, function() {
	console.log('User authentication app listening port 4000')
});
