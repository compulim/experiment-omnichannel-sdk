const { resolve } = require('path');

const MyPlugin = {
  name: "MyPlugin",
  setup(build) {
    build.onResolve({ filter: /^timers$/ }, ({ path }) => {
      if (path === 'timers') {
        return { path: resolve(__dirname, '../node_modules/timers-browserify/main.js') };
      }
    });
  }
}

require('esbuild').build({
  bundle: true,
  entryPoints: [resolve(__dirname, '../src/index.js')],
  loader: {
    '.js': 'jsx',
    '.mp3': 'binary',
    '.png': 'binary',
    '.svg': 'binary'
  },
  minify: true,
  outfile: resolve(__dirname, '../dist/main.esbuild.js'),
  plugins: [MyPlugin, require("esbuild-plugin-node-polyfills")],
  sourcemap: true,
  target: ['chrome90']
});
