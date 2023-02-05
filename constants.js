// constants.js -- global constants

const COLOR = "#FFAD00";
const COMPLIMENTARY_COLOR = "#129FB3";
const COMPLIMENTARY_Y_OFFSET = 20;
const HEX_RADIUS = 50;
const RADIANS_60_DEGREES = Math.PI / 3; // Math.PI = 180 degrees in radians, divided by three gives us 60 degrees in radians
const HALF_HEX_WIDTH = Math.sin(RADIANS_60_DEGREES) * HEX_RADIUS; // x projection of 60 degrees line of hex-radius length
const HEX_WIDTH = HALF_HEX_WIDTH * 2;
const FILL_ALPHA = 0.25;
const LINE_WIDTH = 3;
const LINE_ALPHA = 0.5;
const NODE_ALPHA = 0.75;
const NODE_RADIUS = LINE_WIDTH;
