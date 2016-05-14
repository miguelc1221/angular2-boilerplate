import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev';

const app = express();
const compiler = webpack(config);
const isProduction = process.env.NODE_ENV === 'production';

// Webpack-dev-middleware
if (!isProduction) {
	app.use(webpackMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		hot: true
	}));
	app.use(require("webpack-hot-middleware")(compiler));


    // App Setup
    app.use(express.static(path.join(__dirname, '/../src/public')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../src/public/index.html'));
    });

} else {
   // App Setup
    app.use(express.static(path.join(__dirname, '/../dist')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../dist/index.html'));
    });
}

app.listen(3000, 'localhost', function(err) {
	if (err) { console.log(err); return;}
  	console.log('Listening at http://localhost:3000');
});
