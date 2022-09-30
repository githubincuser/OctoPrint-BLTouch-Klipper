# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class BLTouchKlipperPlugin(octoprint.plugin.AssetPlugin, octoprint.plugin.TemplatePlugin, octoprint.plugin.SettingsPlugin):
	##-- AssetPlugin
	def get_assets(self):
		return dict(
			js=["js/BLTouchKlipper.js"]
		)

	##-- Settings hooks
	def get_settings_defaults(self):
		return dict(cmdProbeUp="BLTOUCH_DEBUG COMMAND=pin_up", cmdProbeDown="BLTOUCH_DEBUG COMMAND=pin_down", cmdSelfTest="",
					cmdHomeAll="G28", cmdProbeBed="G29", cmdSaveSettings="SAVE_CONFIG", cmdRepeatability="")

	##-- Template hooks
	def get_template_configs(self):
		return [dict(type="settings", custom_bindings=False), dict(type="controls", custom_bindings=False)]

	##~~ Softwareupdate hook
	def get_update_information(self):
		return dict(
			BLTouchKlipper=dict(
				displayName="BLTouchKlipper",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="githubincuser",
				repo="OctoPrint-BLTouch-Klipper",
				current=self._plugin_version,
				stable_branch=dict(
					name="Stable",
					branch="master",
					comittish=["master"]
				),
				prerelease_branches=[
					dict(
						name="Release Candidate",
						branch="rc",
						comittish=["rc", "master"]
					)
				],

				# update method: pip
				pip="https://github.com/githubincuser/OctoPrint-BLTouch-Klipper/archive/{target_version}.zip"
			)
		)


__plugin_name__ = "BLTouchKlipper"
__plugin_pythoncompat__ = ">=2.7,<4"


def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = BLTouchKlipperPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}
