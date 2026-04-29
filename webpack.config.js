const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Configuration: Bundling and development setup for React-Redux project
module.exports = {
  // Mode: Code remains unoptimized in development mode
  mode: 'development',

  // Entry point: Main JavaScript file where bundling starts
  entry: './src/index.js',

  // Output: Where and how to save the bundled code
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'bundle.js', // Bundle file name
    clean: true, // Clean previous bundles
    publicPath: '/', // Set public path
  },

  // Development Server: Run server with hot reload and history fallback
  devServer: {
    port: 3000, // Port number: Specifies the port on which the development server will run. Default is 8080, but here it's set to 3000 for React apps.
    open: true, // Automatically open browser: Opens the default browser automatically when the server starts. Useful for quick development feedback.
    historyApiFallback: true, // For SPA routing: Enables fallback to index.html for all routes. Essential for Single Page Applications (SPAs) like React Router.
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5000',
      },
    ],
    //  Without this, refreshing a page like /dashboard would return 404. With it, the server serves index.html, allowing React Router to handle the routing client-side.
    // Example: Navigating to http://localhost:3000/dashboard directly or refreshing the page will load index.html, and React Router will render the appropriate component.
  },

  // Module: Rules for processing files
  module: {
    rules: [
      {
        test: /\.js$/, // For JavaScript files: Matches all files with .js extension. This rule applies to your source JavaScript files.
        exclude: /node_modules/, // Exclude node_modules: Prevents processing of third-party libraries in node_modules, which are already compiled and don't need transpilation. Improves build performance.
        use: 'babel-loader', // Transpile using Babel: Uses Babel to convert modern JavaScript (ES6+, JSX) to older, browser-compatible code. Requires @babel/core and presets like @babel/preset-env and @babel/preset-react.
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'], // Load and inject CSS
      },
    ],
  },

  // Resolve: Automatically resolve file extensions
  resolve: {
    extensions: ['.js'], // Auto-add .js extension: When importing modules, webpack will automatically try appending '.js' if no extension is specified.
    // Allows cleaner imports like 'import Component from './Component'' instead of './Component.js'. Can add more extensions like ['.js', '.jsx'] for React or TypeScript files.
  },

  // Plugins: Add additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use HTML template
    }),
  ],
};
