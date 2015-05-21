/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task clone the core repository expressed in your package.json (paths/core) into the
 * ./az-direct-IT-JS-core directory, and replace the app/js/core with the files dowloaded from the core repository
 *
 */
module.exports = function(options, grunt) {
	grunt.loadNpmTasks('grunt-shell');
	var rimraf = require('rimraf');
	var ncp = require('ncp');

	function callb(err, stdout, stderr, cb){
		if (err)
			throw err;

		console.log('git cloned succesfully!');
		cb();
	}

	return {
		gitclone: {
			command: 'git clone '+ options.paths.coreRepository
		},
		options: {
			callback : callb
		}
	}
}
