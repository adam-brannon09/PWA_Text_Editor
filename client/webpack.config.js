// Import the necessary plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin'); // This plugin generates an HTML file with script tags injected
const WebpackPwaManifest = require('webpack-pwa-manifest'); // This plugin generates a web app manifest for PWAs
const path = require('path'); // Node.js module for handling file paths
const { InjectManifest } = require('workbox-webpack-plugin'); // This plugin injects the service worker into the output

// Constants for commonly used paths and files
const sourcePath = './src/js/'; // Source path for the JavaScript files
const outputPath = path.resolve(__dirname, 'dist'); // Output path for the build files
const swSource = './src-sw.js'; // Source path for the service worker
const iconSource = path.resolve('src/images/logo.png'); // Source path for the app icon

// Constants for commonly used settings
const mode = 'development'; // Mode for webpack ('development' or 'production')

// Rule for handling CSS files
const cssRule = {
  test: /\.css$/i, // Regex pattern to match CSS files
  use: ['style-loader', 'css-loader'], // Use 'style-loader' and 'css-loader' for handling CSS files
};

// Rule for handling JavaScript files
const jsRule = {
  test: /\.m?js$/, // Regex pattern to match JavaScript files
  exclude: /node_modules/, // Exclude the 'node_modules' directory from transpilation
  use: {
    loader: 'babel-loader', // Use 'babel-loader' to transpile JavaScript files
    options: {
      presets: ['@babel/preset-env'], // Use '@babel/preset-env' for transforming ES2015+ into backward compatible version of JavaScript
      plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Plugins for advanced syntax features
    },
  },
};

// Function that configures the webpack settings
module.exports = () => {
  return {
    mode, // Set the mode for webpack

    // Entry points for the application. Specify the 'main' and 'install' scripts
    entry: {
      main: `${sourcePath}index.js`,
      install: `${sourcePath}install.js`,
    },
    
    // Output settings. Specify the file names for the bundles and the output path
    output: {
      filename: '[name].bundle.js', // Name pattern for the output files
      path: outputPath, // Path for the output files
    },
    
    // Plugins used by webpack
    plugins: [
      // Generate an HTML file with the specified template and inject the bundled JavaScript files
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template to use
        title: 'J.A.T.E', // Title for the HTML page
      }),
      
      // Inject the service worker into the output
      new InjectManifest({
        swSrc: swSource, // Source file for the service worker
        swDest: 'src-sw.js', // Output path for the service worker
      }),
      
      // Generate a web app manifest for PWA (Progressive Web App)
      new WebpackPwaManifest({
        fingerprints: false, // Do not add fingerprint to filenames
        inject: true, // Inject the manifest into the HTML
        name: 'Just Another Text Editor', // Full name of the app
        short_name: 'J.A.T.E', // Short name of the app
        description: 'Takes notes with JavaScript syntax highlighting!', // Description of the app
        background_color: '#225ca3', // Background color of the app
        theme_color: '#225ca3', // Theme color of the app
        start_url: '/', // Start URL when the app is opened
        publicPath: '/', // Base path for the assets
        icons: [
          {
            src: iconSource, // Source file for the icon
            sizes: [96, 128, 192, 256, 384, 512], // Sizes for the icons
            destination: path.join('assets', 'icons'), // Output path for the icons
          },
        ],
      }),
    ],

    // Module rules for handling different types of files
    module: {
      rules: [cssRule, jsRule], // Array of rules
    },
  };
};
