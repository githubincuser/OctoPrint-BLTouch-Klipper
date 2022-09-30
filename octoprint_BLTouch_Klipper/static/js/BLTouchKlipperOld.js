/*
 * View model for OctoPrint-BLTouch-Klipper
 */
$(function() {
    function BLTouchKlipperViewModel(parameters) {
        var self = this;

		// assign the injected parameters, e.g.:
		self.controlViewModel = parameters[0];
		self.settingsViewModel = parameters[1];

		self.cmdProbeUp = ko.observable();
		self.cmdProbeDown = ko.observable();
		self.cmdSelfTest = ko.observable();
		self.cmdHomeAll = ko.observable();
		self.cmdProbeBed = ko.observable();
		self.cmdSaveSettings = ko.observable();

		self.getAdditionalControls = function() {
			if (self.settingsViewModel.settings.plugins.BLTouchKlipper.confirmation()) {
				var buttons = [
					{ name: "BLTouchKlipper", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeUp());", name: "Probe Up", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeDown());", name: "Probe Down", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdSelfTest());", name: "Test", confirm: "You are about to run a self test.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdHomeAll());", name: "Home All", confirm: "You are about to Home all Axes.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeBed().split('\\n'));", name: "Probe Bed", confirm: "You are about to probe the bed.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},

					]}
				];
				if(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdRepeatability() !== ""){
				    buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdRepeatability());", name: "Repeat Test", confirm: "You are about to run a repeatability test.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
                }
				buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdSaveSettings());", name: "Save", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
			} else {
				var buttons =[
					{ name: "BLTouchKlipper", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeUp());", name: "Probe Up", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeDown());", name: "Probe Down", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdSelfTest());", name: "Test", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdHomeAll());", name: "HomeAll", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdProbeBed().split('\\n'));", name: "Probe Bed", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
					]}
				];
				if(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdRepeatability() !== ""){
				    buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdRepeatability());", name: "Repeat", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
                }
				buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouchKlipper.cmdSaveSettings());", name: "Save", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
			}
			return buttons;
		};

		self.onBeforeBinding = function() {
			self.cmdProbeUp(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeUp());
			self.cmdProbeDown(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeDown());
			self.cmdSelfTest(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdSelfTest());
			self.cmdReleaseAlarm(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdHomeAll());
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdSaveSettings());
		};

		self.onEventSettingsUpdated = function (payload) {
            self.cmdProbeUp = self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeUp();
            self.cmdProbeDown = self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeDown();
            self.cmdSelfTest = self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdSelfTest();
            self.cmdReleaseAlarm = self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdHomeAll();
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.BLTouchKlipper.cmdSaveSettings());
        };
    };

    // view model class, parameters for constructor, container to bind to
    ADDITIONAL_VIEWMODELS.push([
        BLTouchKlipperViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        ["controlViewModel","settingsViewModel"],

        // e.g. #settings_plugin_BLTouch, #tab_plugin_BLTouch, ...
        ["settings_plugin_BLTouchKlipper_form"]
    ]);
});
