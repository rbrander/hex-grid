// draw.js - functions for drawing things

const drawNeonLine = (ctx, startX, startY, endX, endY, color) => {
  // draw a rounded line
  ctx.lineWidth = LINE_WIDTH;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.globalAlpha = LINE_ALPHA;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // draw nodes (balls on end of line segment)
  ctx.fillStyle = color;
  ctx.globalAlpha = NODE_ALPHA;
  ctx.beginPath();
  ctx.arc(startX, startY, NODE_RADIUS, 0, Math.PI * 2);
  ctx.arc(endX, endY, NODE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
};

const drawHexagon = (ctx, gridX, gridY, radius, strokeColor, fillColor) => {
  const [x, y] = toHex(gridX, gridY);
  const { North, South, NorthEast, SouthEast, NorthWest, SouthWest } = getHexagonCorners(x, y, radius);

  // if there is a fill colour, use it to shade the body of the hexagon
  if (fillColor !== undefined) {
    ctx.globalAlpha = FILL_ALPHA;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(North.x, North.y);
    ctx.lineTo(NorthEast.x, NorthEast.y);
    ctx.lineTo(SouthEast.x, SouthEast.y);
    ctx.lineTo(South.x, South.y);
    ctx.lineTo(SouthWest.x, SouthWest.y);
    ctx.lineTo(NorthWest.x, NorthWest.y);
    ctx.lineTo(North.x, North.y);
    ctx.fill();
  }

  // draw the perimeter lines using neon lines
  drawNeonLine(ctx, North.x, North.y, NorthEast.x, NorthEast.y, strokeColor);
  drawNeonLine(ctx, NorthEast.x, NorthEast.y, SouthEast.x, SouthEast.y, strokeColor);
  drawNeonLine(ctx, SouthEast.x, SouthEast.y, South.x, South.y, strokeColor);
  drawNeonLine(ctx, South.x, South.y, SouthWest.x, SouthWest.y, strokeColor);
  drawNeonLine(ctx, SouthWest.x, SouthWest.y, NorthWest.x, NorthWest.y, strokeColor);
  drawNeonLine(ctx, NorthWest.x, NorthWest.y, North.x, North.y, strokeColor);
};

const drawCursor = () => {
  if (!hasMouse) {
    return;
  }

  // draw a small circle for the cursor
  ctx.globalAlpha = 1.0;

  // draw a thick black circle, for a border
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
  ctx.stroke();

  // draw a thin coloured circle, for a fill
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
  ctx.stroke();
};
