/* extension.js
 *
 * Volume Boost
 * Allows you to set the volume up to 150% from the volume control
 * slider in the status bar without the need to go to sound
 * settings.Allows to set volume up to 150% from the GNOME mixer
 * applet in the status bar without the need to go to sound settings.
 *
 * Author: Diego Barrios Romero
 * Email: <eldruin@eldruin.com>
 * Public domain Copyleft 2012
 */

const Main = imports.ui.main;
// The 150% in sound settings is not exact. It sets a value of 100000,
// which divided by get_vol_max_norm(), which is nowadays 65536, gives
// a ratio of 152.58%
const MultiplyFactor = 1.53;
let _sliderChange;
let _mixer;

function init() {
    _mixer = Main.panel._statusArea['volume'];
}

function _onSliderChange(slider, value) {
    let stream = _mixer._control.get_default_sink();
    let volume = value * _mixer._control.get_vol_max_norm() * MultiplyFactor;
    stream.volume = volume;
    stream.push_volume();
    _mixer._outputSlider.setValue(volume / MultiplyFactor /
				  _mixer._control.get_vol_max_norm());
}


function enable() {
    _sliderChange = _mixer._outputSlider.connect(
	"value-changed",
	_onSliderChange
    );
}

function disable() {
    _mixer._outputSlider.disconnect(_sliderChange);
}
