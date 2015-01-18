var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),
			jasmine: {
				coverage: {
					src: getConfigValue('ui_source').concat(
						 getConfigValue('test_themes')),
					options: {
						vendor: [
							'../lib/createjs-2014.12.12.min.js'
						],
						specs: ['spec/*Spec.js'],
						template: require('grunt-template-jasmine-istanbul'),
						templateOptions: {
							coverage: 'coverage/coverage.json',
							report: {
							    type: 'html',
							    options: {
    							    dir: 'coverage/html/'
							    }
						    }
						}
					}
				},
				run: {
					src: getConfigValue('ui_source').concat(
						 getConfigValue('test_themes')),
					options: {
						vendor: [
							'../lib/createjs-2014.12.12.min.js',
							'../src/util/ScaleBitmap.js'
						],
						specs: 'spec/*Spec.js',
						helpers: [
							//'lib/js-imagediff/imagediff.js'
						],
						host : 'http://127.0.0.1:<%=connect.phantom.options.port%>/'
					}
				}
			},
			connect: {
				serve: {
					options: {
						keepalive: true,
						base: [{
							path: __dirname,
							options:{
								index: '_SpecRunner.html'
							}
						}, '..'],
						useAvailablePort: true,
						port: 8000,
						open: true
					}
				},
				phantom: {
					options: {
						base: [{
							path: __dirname,
							options:{
								index: '_SpecRunner.html'
							}
						}, '..'],
						useAvailablePort: true,
						port: 8000
					}
				}
			},

			listips: {
				run: {
					options: {
						label: "Normal"
					}
				}
			}
		}
	);


	function getBuildConfig() {
		// Read the global settings file from build first.
		var config = grunt.file.readJSON('../build/config.json');

		// If we have a config.local.json .. prefer its values.
		if (grunt.file.exists('config.local.json')) {
			var config2 = grunt.file.readJSON('config.local.json');
			_.extend(config, config2);
		}
		return config;
	}

	function getConfigValue(name) {
		var config = grunt.config.get('buildConfig');

		if (config == null) {
			config = getBuildConfig();
			grunt.config.set('buildConfig', config);
		}

		return config[name];
	}
	
	// Load all the tasks we need
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadTasks('tasks/');

	grunt.registerTask("default", "Launches browser-based tests",["serve"]);
	grunt.registerTask("serve", "Launches browser-based tests", ["jasmine:coverage", "jasmine:run:build", "listips", "connect"]);
	grunt.registerTask("headless", "phantom");
	grunt.registerTask("phantom", "Launches phantom-based tests", ["connect:phantom", "jasmine"]);
};
