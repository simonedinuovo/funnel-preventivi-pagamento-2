/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task configures LESS for dev and dist
 */

module.exports = function (options, grunt) {

	grunt.loadNpmTasks("grunt-contrib-less");

	function trimStart(str, trimStr) {
		if (str.indexOf(trimStr) === 0) {
			return str.replace(trimStr, "");
		}
		else {
			return str;
		}
	}

	function getFilesMin(dir, files_, dirName) {
		return getFiles(dir, files_, dirName, true);
	}

	function getFiles(dir, files_, dirName, isMin) {
		files_ = files_ || {};
		if (typeof files_ === 'undefined') files_ = {};
		if (typeof dirName === 'undefined') dirName = "";
		if (typeof isMin === 'undefined') isMin = false;
		var files = fs.readdirSync(dir);
		for (var i in files) {
			if (!files.hasOwnProperty(i)) continue;
			// skip on files to be only imported (which start with "_" char)
            console.log("less module is parsing ", files[i]);
			var noExtName = files[i].split(".less")[0];
			//var des = files[i].split('.');
			//if ( des[des.length-1] != 'css' && des[des.length-1] != 'less' ) continue;
            if (files[i] === '.DS_Store') continue;
			if (noExtName.indexOf("_") === 0) continue;
			var name = dir + '/' + files[i];
			if (fs.statSync(name).isDirectory()) {
				getFiles(name, files_, files[i]);
			}
			else {
				files_[(isMin ? paths.dist : paths.dev) + "/app/css/" + dirName + noExtName + (isMin ? ".min" : "") + ".css"] = name;
			}
		}
		return files_;
	}

	var fs = require("fs"),
		paths = options.paths,
		dev_files_boot = {},
		dev_files = {},
		dist_files = {};

	//dev_files["" + paths.dev + "/app/css/app.css"] = "" + paths.app + "/less/app.less";
	//dist_files["" + paths.dist + "/app/css/app.min.css"] = "" + paths.app + "/less/app.less";
	dev_files = getFiles(paths.app + "/less");
	dist_files = getFilesMin(paths.app + "/less");

	return {
		dev: {
			files: dev_files,
			expand: true,
			dist: "" + paths.dev + "/app/css/",
			options: {
				sourceMap: true,
				sourceMapBasepath: paths.dev,
				sourceMapRootpath: "/"
			}
		},
		dist: {
			files: dist_files,
			expand: true,
			dist: "" + paths.dist + "/app/css/",
			options: {
				cleancss: true
			}
		},
		options: {
			paths: [paths.libs_src, "" + paths.dev + "/app/css"],
			ieCompat: false,
			relativeUrls: true
		}
	};
};
