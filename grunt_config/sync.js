/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task copy the changed files from the source to the destination folder
 */

var _= require("underscore");

module.exports = function(options, grunt) {

    grunt.loadNpmTasks("grunt-sync");

    var paths = options.paths;

    return {
        dev_js: {
            files: [
                {
                    expand: true,
                    src: "js/**/*.js",
                    cwd: paths.app,
                    dest: paths.dev + "/app"
                }
            ]
        },
        dev_libs:{
            files: [
                {
                    expand: true,
                    cwd: paths.libs_src,
                    src: options.jsLibs.concat(options.cssLibs),
                    dest: "" + paths.dev + "/lib"
                }
            ]
        },
        dev_static: {
            files: [
                {
                    expand: true,
                    src: ["**/*.{ico,png,jpg}", "fonts/**/*", "mocks/**/*", "partials/**/*", "toolkit/**/*","**/*.json"],
                    cwd: paths.app,
                    dest: paths.dev + "/app"
                }
            ].concat(options.staticLibs.map(function(lib) {
                    return _.extend({
                        dest: paths.dev
                    }, lib);
                }))
        },
        fonts_dev: {
            files: [
                {
                    expand: true,
                    cwd: "" + paths.libs_src + "/bootstrap/dist",
                    src: "fonts/**/*",
                    dest: "" + paths.dev + "/lib/bootstrap/dist"
                }
            ]
        },
        dist_js: {
            files: [
                {
                    expand: true,
                    src: "js/**/*.js",
                    cwd: paths.app,
                    dest: "" + paths.dist + "/app"
                }
            ]
        },
        dist_libs:{
            files: [
                {
                    expand: true,
                    cwd: paths.libs_src,
                    src: options.jsLibsMin.concat(options.cssLibsMin),
                    dest: "" + paths.dist + "/lib"
                }
            ]
        },
        dist_static: {
            files: [
                {
                    expand: true,
                    src: ["**/*.{ico,png,jpg}", "fonts/**/*", "partials/**/*"],
                    cwd: paths.app,
                    dest: "" + paths.dist + "/app"
                }
            ].concat(options.staticLibs.map(function(lib) {
                    return _.extend({
                        dest: paths.dist
                    }, lib);
                }))
        },
        fonts_dist: {
            files: [
                {
                    expand: true,
                    cwd: "" + paths.libs_src + "/bootstrap/dist",
                    src: "fonts/**/*",
                    dest: "" + paths.dist + "/lib/bootstrap/dist"
                }
            ]
        }
    };
};
