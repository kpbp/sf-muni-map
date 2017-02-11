import node from "rollup-plugin-node-resolve";
import scss from 'rollup-plugin-scss';

export default {
  entry: "src/entry.js",
  format: "iife",
  moduleName: "App",
  plugins: [
    node(),
    scss()
  ],
  dest: "dist/bundle.js"
};
