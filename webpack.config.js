const webpack = require("webpack");

module.exports = {
  // Configura le tue voci di entry, output, regole, plugin, ecc. qui...

  // Configura le opzioni per la compilazione
  mode: "development",
  devtool: "source-map",

  // Gestione dei warning
  performance: {
    hints: false, // Disabilita i warning sulle dimensioni dei bundle
  },
  stats: {
    warningsFilter: [
      "warning message to ignore 1",
      "warning message to ignore 2",
    ], // Ignora i warning specifici
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /warning message to ignore 3/,
    }), // Ignora un warning specifico tramite una regex
  ],
};
