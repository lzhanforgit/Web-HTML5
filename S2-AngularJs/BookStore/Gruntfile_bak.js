module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                //separator: ';'
            },
            allInOne: { //所有JS文件全部合并成一份文件
                src: ['src/js/**/*.js'],
                dest: 'dest/src-concated/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildrelease: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'dest/src-concated/js', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest/release/js', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            },
            buildsrc: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest/src-min', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            },
            buildall: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            }
        },
        watch: {
            javascript: {
                files: ['src/js/**/*.js'],
                tasks: ['concat:allInOne', 'uglify:buildsrc', 'uglify:buildrelease'],
                options: {
                    spawn: true,
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['concat', 'uglify']);
};