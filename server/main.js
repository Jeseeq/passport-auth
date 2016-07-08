/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const historyApiFallback = require ('connect-history-api-fallback');
const auth = require('./middleware/auth.js');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const config = require('./config/config');
const users = require('./routes/auth');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = express();

/*Apply middleware*/
app.use(historyApiFallback({
  verbose: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.decodeToken);
// pass the passport middleware
app.use(passport.initialize());

// load models
require('./models')(config);
// load passport strategies
require('./passport')(config);
/*Hot reload dev middleware*/
if (isDeveloping) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use('/', express.static(path.join(__dirname, 'dist' )))
} else {
  app.use('/', express.static(path.join(__dirname, '..', 'dist' )));

}



// routes
app.use('/api/users', users);


const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

/*socket part*/

const io = require('socket.io')(server);

const sendComments = function (socket) {
	fs.readFile('data.json', 'utf8', function(err, comments) {
		comments = JSON.parse(comments);
		socket.emit('comments', comments);
	});
};

io.on('connection', function (socket) {
  console.log('New client connected!');

  socket.on('fetchComments', function () {
		sendComments(socket);
	});

	socket.on('newComment', function (comment, callback) {
		fs.readFile('data.json', 'utf8', function(err, comments) {
			comments = JSON.parse(comments);
			comments.push(comment);
			fs.writeFile('data.json', JSON.stringify(comments, null, 4), function (err) {
				io.emit('comments', comments);
				callback(err);
			});
		});
	});
});
