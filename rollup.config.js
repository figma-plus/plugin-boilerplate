import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import run from 'rollup-plugin-run';
import serve from 'rollup-plugin-serve'
import pkg from './package.json'
import fs from 'fs';
import shajs from 'sha.js';
import boxen from 'boxen';
import chalk from 'chalk';

const production = !process.env.ROLLUP_WATCH;
const development = process.env.ROLLUP_WATCH;
const RUN = process.env.RUN;

// Default options
const devServerOptions = {
  verbose: false,
  contentBase: ['dist'],
  host: 'localhost',
	port: 8080,
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
  }
};


const boxOptions = {
	borderColor: "gray",
	padding: 1,
	borderStyle: "round",
	
}

const logger = () => {
	return {
		generateBundle(bundle) {
			const stats = fs.statSync(`${pkg.files[0]}/${pkg.name}.js`);
			
			const fileSize = parseFloat(Math.round(stats.size) / 1024).toFixed(2);			

			const bundleContent = [
				chalk.green.bold(`BUNDLE INFO:`),
				chalk.white.bold('-- Filename:           ') + chalk.white(bundle.file),
			];

			if (production) {
				bundleContent.push(
					chalk.white.bold('-- Size:              ') + chalk.white(`${fileSize}KB`),
					chalk.gray.bold('ⓘ') + chalk.gray('  Try to keep it under 100KB.'),
				)
			}

			console.log(boxen(bundleContent.join("\n"), boxOptions));

			if (development) {
				const devContent = [
					chalk.green.bold('FOR PLUGIN MANAGER:'),
					chalk.white.bold('-- Dev Server Port:  ')+chalk.white(devServerOptions.port),
					chalk.white.bold('-- JS File Path:     ')+chalk.white(bundle.file),
				];

				console.log(boxen(devContent.join("\n"), boxOptions));
			}

			if (production) {
				const file = fs.readFileSync(bundle.file);
				const hash = shajs('sha256').update(bundle).digest('hex');
				const date = new Date();
				const publishDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

				const productionContent = [
					chalk.green.bold('-- PUBLISHING INFO'),
					chalk.white.bold('-- id:               ') + chalk.white(pkg.name),
					chalk.white.bold('-- publishDate:      ') + chalk.white(publishDate),
					chalk.white.bold('-- hash:             ') + chalk.white(hash),
					chalk.white.bold('-- manifest:         ') + chalk.white(pkg.manifestUrl),
				]

				const productionContent2 = [	
					chalk.green.bold('PUBLISHING INSTRUCTIONS'),
					chalk.red('Make sure that your plugin actually works before proceeding ;)'),
					chalk.white.bold('1. ') + chalk.white('Create a new branch in your repo named ') + chalk.white.underline('gh-pages'),
					chalk.white.bold('2. ') + chalk.white('Go to your repo settings and verify that GitHub Pages is working'),
					chalk.white.bold('3. ') + chalk.white('Double check that your manifest & plugin files are publicly accessible from your github-pages url.'),
					chalk.white.bold('4. ') + chalk.white('Visit ➜  https://github.com/jachui/figma-plugin-manager/edit/gh-pages/masterList.json'),
					chalk.white.bold('5. ') + chalk.white('Use the info above to include your plugin'),
					chalk.white.bold('6. ') + chalk.white('Submit a PR'),
				];

				console.log(boxen(productionContent.join("\n"), boxOptions));
				console.log(boxen(productionContent2.join("\n"), boxOptions));
			}

		}
	}
}

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: pkg.name,
			file: `${pkg.files[0]}/${pkg.name}.js`,
			format: 'umd'
		},
		plugins: [
			resolve(),
      babel({runtimeHelpers: true,}),
      cjs(),
			development && RUN && run(), // Dev mode: run the bundle to see output in console/terminal
			development && serve(devServerOptions), // Dev Serve mode: serve  bundle
			production && uglify(), // Production: uglify bundle,
			logger()
    ],
	},
];