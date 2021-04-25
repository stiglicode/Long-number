module.exports = function(grunt) {
    require("jit-grunt")(grunt);
    require("time-grunt")(grunt);

    grunt.initConfig({
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: "./dist/lns.min.js.map"
                },
                files:[{
                    src: "./dist/lns.js",
                    dest: "./dist/lns.min.js"
                }]
            },
        },
        ts: {
            default : {
                src: ["./src/index.ts", "!node_modules/**"],
                out: "dist/lns.js"
            }
        }
    })
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("production-build", ["ts","uglify"]);
}