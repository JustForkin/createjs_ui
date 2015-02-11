/**
 * @module CreateJSUI
 */
this.createjs_ui = this.createjs_ui || {};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class CreateJSUI
	 **/
	var s = createjs_ui.CreateJSUI = createjs_ui.CreateJSUI || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*=version*/""; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*=date*/""; // injected by build process

})();
