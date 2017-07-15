# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class BLTouchPlugin(octoprint.plugin.AssetPlugin, octoprint.plugin.TemplatePlugin, octoprint.plugin.SettingsPlugin):
	##-- AssetPlugin 
	def get_assets(self):
			return dict(
				js=["js/BLTouch.js"]
			)
			
	##-- Settings hooks
	def get_settings_defaults(self):
		return dict(cmdProbeUp="M280 P0 S90",cmdProbeDown="M280 P0 S10",cmdSelfTest="M280 P0 S120",cmdReleaseAlarm="M280 P0 S160")	
	
	##-- Template hooks
	def get_template_configs(self):
		return [dict(type="settings",custom_bindings=False),dict(type="controls",custom_bindings=False)]

	##~~ Softwareupdate hook
	def get_update_information(self):
		# Define the configuration for your plugin to use with the Software Update
		# Plugin here. See https://github.com/foosel/OctoPrint/wiki/Plugin:-Software-Update
		# for details.
		return dict(
			BLTouch=dict(
				displayName="BLTouch Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-BLTouch",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-Bltouch/archive/{target_version}.zip"
			)
		)


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "BLTouch Plugin"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = BLTouchPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

