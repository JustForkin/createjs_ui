module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'lib/createjs-2014.12.12.min.js',
            // make sure ScaleBitmap is loaded AFTER createjs,
            // because it requires createjs.DisplayObject
            'lib/jasmine.async.js',
            'src/util/ScaleBitmap.js',
            'src/skin/Theme.js',
            'src/layout/ViewPortBounds.js',
            'src/layout/Layout.js',
            'src/layout/LayoutAlignment.js',
            'src/layout/VerticalLayout.js',
            'src/layout/HorizontalLayout.js',
            // make sure Control is loaded first (all other controls depend on
            // Control)
            'src/core/Control.js',
            'src/shapes/Shape.js',
            'src/shapes/Rect.js',
            'src/controls/Button.js',
            'src/controls/ToggleButton.js',
            'src/controls/LayoutGroup.js',
            'themes/ShapeTheme.js',
            'test/TestTheme.js',
            'test/*.js'
        ],
        browsers: ['PhantomJS'],
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'src/*/*.js': ['coverage']
        }
    });
};
