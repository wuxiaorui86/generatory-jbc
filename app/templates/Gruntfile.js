var fs = require('fs');

module.exports = function (grunt) {
	var defaultVersion = "v1";
	var target = grunt.option('target');
	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		version : target || defaultVersion,
		moduleName : pkg.name,
		banner : '/* JBC build, <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		kmc : {
			options : {
				packages : [{
						name : '<%= moduleName %>',
						path : '../'
					}
				],
				map : [["<%= moduleName %>/src", "jbc/<%=moduleName%>"]]
			},
			main : {
				files : [{
						src : "src/<%= version %>/index.js",
						dest : "build/<%=version%>/index.js"
					}
				]
			}
		},
		uglify : {
			options : {
				banner : '<%=banner%>'
			},
			base : {
				files : {
					'build/<%=version%>/index-min.js' : ['build/<%=version%>/index.js']
				}
			}
		},
		copy : {
			page : {
				files : [{
						expand : true,
						cwd : 'src/<%= version %>',
						src : ['*.less', '*.css'],
						dest : 'build/<%=version%>'
					}
				]
			}
		},
		cssmin : {
			options : {
				banner : '<%=banner%>'
			},
			page : {
				files : [{
						expand : true,
						cwd : 'src/<%= version %>',
						src : ['*.css', '!*-min.css'],
						dest : 'build/<%=version %>',
						ext : '-min.css'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-kmc');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['kmc:main', 'uglify:base', 'copy:page', 'cssmin:page']);
};
