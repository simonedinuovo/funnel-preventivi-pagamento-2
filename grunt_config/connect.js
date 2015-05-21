/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task starts a http-serve and serve your destination folder,
 *          and redirects all request which can't be respond to the server in the proxy configuration,
 *          it also have a livereload which recognize changes and reload the site
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks("grunt-contrib-connect");

    var paths = options.paths;

    return {
        server: {
            options: {
                hostname: 'localhost',
                port: 9001,
                base: paths.dev,
                keepalive: false,
                open:true,
                livereload:true,
                middleware: function (connect, options) {
                    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    return [
                        proxy,
                        connect.static(paths.dev),
                        connect.directory(paths.dev)
                    ];
                }
            },
            proxies: [
                {
                    context: '/oneweb',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    xforward: false
                }
            ]
        }
    };
};