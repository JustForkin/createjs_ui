module.exports = function (grunt) {
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),
			jasmine: {
				coverage: {
					src: [
						// make sure ScaleBitmap is loaded AFTER createjs,
						// because it requires createjs.DisplayObject
						'../src/skin/Theme.js',
						'../src/layout/ViewPortBounds.js',
						'../src/layout/Layout.js',
						'../src/layout/LayoutAlignment.js',
						'../src/layout/VerticalLayout.js',
						'../src/layout/HorizontalLayout.js',
						'../src/layout/TiledLayout.js',
						'../src/layout/TiledColumnsLayout.js',
						'../src/layout/TiledRowsLayout.js',
						// make sure Control is loaded first (all other controls depend on
						// Control)
						'../src/core/Control.js',
						'../src/shapes/Shape.js',
						'../src/shapes/Rect.js',
						'../src/controls/Button.js',
						'../src/controls/ToggleButton.js',
						'../src/controls/LayoutGroup.js',
						'../themes/ShapeTheme.js',
						'src/TestTheme.js'
					],
					options: {
						vendor: [
							'../lib/createjs-2014.12.12.min.js',
							'../src/util/ScaleBitmap.js'
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
					src: [
						'../src/skin/Theme.js',
						'../src/layout/ViewPortBounds.js',
						'../src/layout/Layout.js',
						'../src/layout/LayoutAlignment.js',
						'../src/layout/VerticalLayout.js',
						'../src/layout/HorizontalLayout.js',
                        '../src/layout/TiledLayout.js',
                        '../src/layout/TiledColumnsLayout.js',
                        '../src/layout/TiledRowsLayout.js',
						// make sure Control is loaded first (all other controls depend on
						// Control)
						'../src/core/Control.js',
						'../src/shapes/Shape.js',
						'../src/shapes/Rect.js',
						'../src/controls/Button.js',
						'../src/controls/ToggleButton.js',
						'../src/controls/LayoutGroup.js',
						'../themes/ShapeTheme.js',
						'src/TestTheme.js'
					],
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

	// Load all the tasks we need
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadTasks('tasks/');

	grunt.registerTask("default", "Launches browser-based tests",["serve"]);
	grunt.registerTask("serve", "Launches browser-based tests", ["jasmine:coverage", "jasmine:run:build", "listips", "connect"]);
	grunt.registerTask("headless", "phantom");
	grunt.registerTask("phantom", "Launches phantom-based tests", ["connect:phantom", "jasmine"]);
};
