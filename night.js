function showError(err, title) {
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
	app.displayAlert(err.toString(), {
		withTitle: title
	});
}

function run(argv) {
	const prefName = 'System Preferences';
	const anchor = new Application(prefName)
		.panes.byId('com.apple.preference.displays')
		.anchors.byName('displaysNightShiftTab');

	try {
		anchor.reveal();
		delay(0.5);
	} catch (err) {
		showError(err, 'Please update your macOS');
		return;
	}

	new Application('System Events')
		.processes[prefName]
		.windows()
		.map(w => w.tabGroups[0])
		.filter(t => t.checkboxes.length > 0)
		.forEach(t => t.checkboxes[0].click());
}

