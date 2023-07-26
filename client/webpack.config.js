// Import necessary plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Function that configures the webpack settings
module.exports = () => {
  return {
    // Set the mode to development (you can also use 'production' for optimized builds)
    mode: 'development',
    
    // Entry points for the application, specifying the main and install scripts
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    
    // Output settings, specifying the bundle file names and the output path
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    // List of plugins used by webpack
    plugins: [
      // Plugin to generate an HTML file with the specified template and inject the bundled JavaScript files
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      
      // Plugin to inject the service worker into the generated output
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the service worker source file
        swDest: 'src-sw.js', // Destination path for the generated service worker file
      }),
      
      // Plugin to generate a web app manifest file for PWA (Progressive Web App)
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the app icon image
            sizes: [96, 128, 192, 256, 384, 512], // Different sizes for the icon
            destination: path.join('assets', 'icons'), // Destination folder for the generated icons
          },
        ],
      }),
    ],

    // Module settings for handling different types of files
    module: {
      rules: [
        {
          test: /\.css$/i, // Rule to handle CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for handling CSS files
        },
        {
          test: /\.m?js$/, // Rule to handle JavaScript files
          exclude: /node_modules/, // Exclude node_modules folder from transpilation
          use: {
            loader: 'babel-loader', // Use babel-loader to transpile JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Use the @babel/preset-env preset for compatibility
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Additional plugins for advanced syntax features
            },
          },
        },
      ],
    },
  };
};
