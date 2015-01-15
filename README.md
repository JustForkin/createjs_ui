createjs_ui
===========

UI system for createjs ( http://createjs.com )
inspired by feathers-ui ( http://feathersui.com ) for ActionScript

features
========

 1. common components for easy UI creation
     - Button
     - ToggleButton

(yeah, its work-in-progress)
overview
========

files in this folder
--------------------
 - LICENSE - the BSD software license
 - INSTALL - information how to building and testing createjs_ui
 - test.sh - 1-line script for unix systems that simply runs karma
 - test.conf.js - configuration for jasmine testing

subfolders of this folder
-------------------------

 - lib - required libraries (just createjs)
 - src - source code for createjs_ui
 - test - jasmine unit tests
 - example - simple examples to show the usage (and to have something more graphical besides the jasmine-tests)

Theming
=======
Creating own themes is easy. You can take a look at Themes/AeonTheme.js for an example. It is possible to have different Themes in one project which allows you to easily style components just as you want to.

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

 - buttons without theme should at least show the label.
 - text renderer to allow DOM-text (makes i18n for some projects easier)
 - find a nicer name (createjs_ui does not roll that easily off the tongue)
 - viewport(s)
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
 - more examples:
   - ToggleButton
   - component explorer
 - more shapes:
   - Circle
   - Line
   - Arc (e.g. for gauge)
   - PolyStar/Hex/Pentagon
   - Polyggon
 - transitions and transition animations
 - testing using js-imagediff and grunt (like EaselJS - see http://blog.createjs.com/unit-tests-in-easeljs-preloadjs/ )
 - use a texture atlas, so we need to only load one image (and/or cache skins)
 - Drag-and-Drop
 - Gestue helper (pitch-zoom)
 - async testing
 - How-To tutorial and beginners documentation
