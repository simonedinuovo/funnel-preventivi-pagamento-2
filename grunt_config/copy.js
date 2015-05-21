/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task deletes the destination folder
 */

module.exports = function(options, grunt) {

	grunt.loadNpmTasks("grunt-contrib-copy");


	return  {
		core: {
			expand: true,
			src: '**',
			cwd: options.paths.coreUpdate,
			dest: 'app/js/core'
		}
	}

};
