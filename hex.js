// hex.js -- hexagon utilty functions

// getHexagonCorners returns an object with six properties, each representing the coordinates of a corner of a hexagon
// given its center point (x, y) and radius.
const getHexagonCorners = (x, y, radius) => {
  // there are 60 degrees between each section of the hexagon (360 degrees / 6 sides = 60 degrees per side)
  const HALF_HEX_WIDTH = Math.sin(RADIANS_60_DEGREES) * radius; // x projection of 60 degrees line of hex-radius length
  const QUARTER_HEX_HEIGHT = Math.cos(RADIANS_60_DEGREES) * radius; // cos(60) = 0.5, multiplied by the radius gives us a quarter of the height
  return ({
    North: {
      x: x,
      y: y - radius
    },
    NorthEast: {
      x: x + HALF_HEX_WIDTH,
      y: y - QUARTER_HEX_HEIGHT
    },
    SouthEast: {
      x: x + HALF_HEX_WIDTH,
      y: y + QUARTER_HEX_HEIGHT
    },
    South: {
      x: x,
      y: y + radius
    },
    SouthWest: {
      x: x - HALF_HEX_WIDTH,
      y: y + QUARTER_HEX_HEIGHT
    },
    NorthWest: {
      x: x - HALF_HEX_WIDTH,
      y: y - QUARTER_HEX_HEIGHT
    }
  })
};

// given a grid coordinate, return the coordinates of the six surrounding cells
const getHexNeighborCells = (gridX, gridY) => ([
  { x: gridX - 1, y: gridY },
  { x: gridX + 1, y: gridY },
  { x: gridX, y: gridY + 1 },
  { x: gridX, y: gridY - 1 },
  { x: gridX + (gridY % 2 === 0 ? -1 : +1), y: gridY + 1 },
  { x: gridX + (gridY % 2 === 0 ? -1 : +1), y: gridY - 1 }
]);

// takes a grid location and returns a pixel location
const toHex = (x, y) => {
  const hexX = (y % 2 === 0 ? 0 : HALF_HEX_WIDTH) + x * HEX_WIDTH;
  const hexY = (y * HEX_RADIUS * 1.5); // 1.5 = 1 + cos(60deg) = 1 + 0.5
  return [hexX, hexY];
};

// takes a pixel location and returns the grid location
const fromHex = (hexX, hexY) => {
  const y = Math.round(hexY / (1.5 * HEX_RADIUS));
  const x = Math.round((hexX - (y % 2 === 0 ? 0 : HALF_HEX_WIDTH)) / HEX_WIDTH);
  return [x, y];
};
