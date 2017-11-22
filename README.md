WARNING! Current State of this project
======================================
Because we switched to [PIXI](http://www.pixijs.com/) development of this has been discontinued. Take a look at [GOWN]( https://github.com/greyrook/gown.js).

createjs_ui
===========

UI system for createjs ( http://createjs.com )
inspired by feathers-ui ( http://feathersui.com ) for ActionScript

features
========

 1. common components for easy UI creation
     - Button
       - simple Button, with label and background, easy to extend using themes
     - ToggleButton
       - a button that has pressed-states
     - LayoutGroup
       - a group where you can add other components and align them
     - ScrollArea
       - a masked area that has exactly one child as content that can be scrolled.
 1. layouting
     - horizontal, vertical or tile-based layouts (very similar to the feathers LayoutGroup)
 1. scrollable container
     - the ScrollArea creates a view port for some content that can be scrolled using mouse (including mouse wheel) or touch gestues. When this content is a LayoutGroup the scroll behaviour will be dependent on the content layout (when it is a horizontal layout it will default to horizontal scrolling, vertical layout defaults to vertical scrolling - but you can force a specific scroll behaviour if you want).
 1. basic shapes that provide width and height which makes it easier to change them dynamically (for use in themes)

overview
========

subfolders of this folder
-------------------------

 - build - grunt build scripts
 - example - simple examples to show the usage (and to have something more graphical besides the jasmine-tests)
 - lib - required libraries (just createjs)
 - src - source code for createjs_ui
 - tests - jasmine unit tests and istanbul coverage support (use grunt to run)
 - themes - basic UI example themes

Theming
=======
Creating own themes is easy. You can take a look at Themes/AeonTheme.js for a more detailed example using tiled images or Themes/ShapeTheme.js for a theme using only basic EaselJS shapes. It is possible to have different themes in one project which allows you to easily style components just as you want to.

The theme/TestTheme.js is a fake Theme used only for the unit tests.

Under the hood
--------------
Center of the theming system is the "skins"-object. It holds unique names of differnt controls as key (e.g. "button" as identifier for createjs_ui.Button) and nested objects as value. These nested objects allow you to save different graphics for different skins (e.g. "down" when the user pressed a button down). The graphic for the state can be an images but also any kind of shape (you can set everything that can be added to a EaselJS-Container as skin).
It is important that the variable width/height of your skin can be changed so your skin can be layouted correctly.
Every control need its own instance for the skin, so you have to wrap it in a function that creates a new instance of the skin.

In short, the skins-object looks like this:
`theme.skins = {<control>: {<state>: function () { new <skin>() } }}`

TODO
======
(note: this ToDo list does not show an order or priority, nor will it all be implemented, its just a list of things that would be nice-to-have)

 - find a nicer name (createjs_ui does not roll that easily off the tongue)
 - better and more detailed documentation
 - How-To tutorial and beginners documentation
 - Bugfix: buttons without theme should at least show the label.
 - text renderer to allow DOM-text (makes i18n for some projects easier)
 - viewport(s) ?
 - build/compress themes
 - benchmarking capabilities
 - handle if createjs_ui gets imported before easeljs
 - disabled-state for controls
 - more controls (and examples):
   - Label (supporting default createjs.Text or DOM)
   - DOMComponent
   - Dialog
   - Slider
   - List (Item Renderer)
   - PickerList
   - Checkbox
   - RadioBox
   - Toggle
   - Gauge
   - NumericStepper
   - TextInput
   - ProgressBar
   - ScaleTool (to change width/height of a control)
   - ScrollContainer (sth. with the same API as feathers)
 - more examples:
   - ToggleButton
   - component explorer
   - scrolling
 - more shapes:
   - Line
   - Arc (e.g. for gauge)
   - PolyStar/Hex/Pentagon
   - Polyggon
 - transitions and transition animations
 - better testing using js-imagediff and grunt (like EaselJS - see http://blog.createjs.com/unit-tests-in-easeljs-preloadjs/ )
 - use a texture atlas, so we need to only load one image (and/or cache skins)
 - Drag-and-Drop
 - Gestue helper (pitch-zoom)
 - async testing
