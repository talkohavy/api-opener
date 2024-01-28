import fs from 'fs';
import { defineConfig } from 'tsup';

const outDir = 'dist';

// The options here is derived from CLI flags.
const tsupConfig = defineConfig((_options) => ({
  entry: ['./src/index.js'],
  outDir, // <--- defaults to dist
  bundle: false,
  minify: true, // <--- You can minify the output, resulting into lower bundle sizes.
  format: ['esm'], // <-- If package.json type is set to module, the filenames are: [.js,.cjs], else: [.mjs, .js].
  clean: true, // <--- Should clean output directory before each build?
  treeshake: true, // <--- esbuild has tree shaking enabled by default, but sometimes it's not working very well, so tsup offers an additional option to let you use Rollup for tree shaking instead. This flag will enable Rollup for tree shaking.
  publicDir: './src',
  // sourcemap: true, // <-- If you don't minify you don't need sourcemaps! This will emit a ./dist/index.js.map.
  // splitting: true, // <--- defaults to true. Code splitting currently only works with the esm output format.
  // dts: true, // <--- Generate declaration file, meaning a index.d.ts.
  // target: , // <--- The value for target defaults to compilerOptions.target in your tsconfig.json, or node14 if unspecified. For more information check out esbuild's target option.
  // env: process.NODE_ENV,
  async onSuccess() {
    copyReadmeFile();

    copyIndexTsFile();

    copyNpmrcFile();

    copyAndManipulatePackageJsonFile();

    // Step 5: run the cleanup function
    return () => {
      // cleanupFunction()
      console.log('DONE !!!');
    };
  },
}));

function copyReadmeFile() {
  const readStream = fs.createReadStream('./README.md');
  const writeStream = fs.createWriteStream(`./${outDir}/README.md`);
  readStream.pipe(writeStream);
}

function copyIndexTsFile() {
  const readStream = fs.createReadStream('./types/index.d.ts');
  const writeStream = fs.createWriteStream(`./${outDir}/index.d.ts`);
  readStream.pipe(writeStream);
}

function copyNpmrcFile() {
  const readStream = fs.createReadStream('./.npmrc');
  const writeStream = fs.createWriteStream(`./${outDir}/.npmrc`);
  readStream.pipe(writeStream);
}

function copyAndManipulatePackageJsonFile() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

  // - Remove all scripts
  delete packageJson.scripts;

  // - Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';

  fs.writeFileSync(`./${outDir}/package.json`, JSON.stringify(packageJson));
}

export default tsupConfig;
