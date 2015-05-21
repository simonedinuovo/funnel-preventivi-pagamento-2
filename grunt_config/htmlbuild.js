/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task include all necessary files for dev and dist mode into the index.html
 */

module.exports = function (options, grunt) {

	grunt.loadNpmTasks("grunt-html-build");

	var paths = options.paths;

	return {
		dev: {
			src: "" + paths.app + "/index.html",
			dest: "" + paths.dev + "/index.html",
			options: {
				prefix: "x",
				styles: {
					all: options.cssLibs.map(function (lib) {
						return "" + paths.dev + "/lib/" + lib;
					}).concat(["" + paths.dev + "/app/css/*"])
				},
				scripts: {
					all: options.jsLibs.map(function (lib) {
						return "" + paths.dev + "/lib/" + lib;
					}).concat(["" + paths.dev + "/app/js/app.js", "" + paths.dev + "/app/js/route.js", "" + paths.dev + "/app/js/**/*.js", "" + paths.dev + "/app/mocks/**/*.js", "!" + paths.dev + "/app/js/templates.js"])
				},
				data: {
					version: options.version,
					title: options.name
				}
			}
		},
		dist: {
			src: "" + paths.app + "/index.html",
			dest: "" + paths.dist + "/app/index.html",
			options: {
				prefix: "x",
				styles: {
					all: "" + paths.dist + "/app/css/app.min.css"
				},
				scripts: {
					all: options.jsLibsMin.map(function (lib) {
						return "" + paths.dist + "/lib/" + lib;
					}).concat(["" + paths.dist + "/app/js/app.js", "" + paths.dist + "/app/js/route.js", "" + paths.dist + "/app/js/**/*.js", "!" + paths.dist + "/app/js/templates.js"])
				},
				data: {
					version: options.version,
					title: options.name
				}
			}
		},
		options: {
			relative: true,
			prefix: "/x"
		}
	};
};
