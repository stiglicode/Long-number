module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'src/dist/static/js/app.sourcemap.map'
                  },
                files:[{
                    src: "src/dist/static/js/app.js",
                    dest: "src/dist/static/js/app.min.js"
                }]
            },
        },
    })

    grunt.registerTask("production-build", ['uglify']);
}