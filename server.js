const { createServer } = require('http');
const next = require('next');

const app = next({
	dev: process.env.NODE_ENV !== 'production'
	// dev: specifies whether we are running our server in production or development mode.
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
	createServer(handler).listen(3000, (err) => {
		// Setting port
		if (err) throw err;
		console.log('Ready on localhost:3000');
	});
}); 