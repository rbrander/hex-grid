const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const towerPiece = document.getElementById('tower-piece');

// state
let mouseX = 0, mouseY = 0, isMouseDown = false, hasMouse = false, selectedPiece = undefined;
let pieces = [
  { x: 7, y: 7},
  { x: 6, y: 3},
  { x: 3, y: 7},
  { x: 2, y: 5}
];

// given grid coordinates, places image on hex grid
const drawPieceOnHex = (gridX, gridY, piece = towerPiece) => {
  if (!piece) {
    return;
  }

  ctx.globalAlpha = 1.0;
  const [hexX, hexY] = toHex(gridX, gridY);
  const pieceWidth = HEX_RADIUS * 1.5; // 1.5 is arbitrary based on testing
  const pieceHeight = (piece.height / piece.width) * pieceWidth; // use aspect ration to calculate height based on desired width
  const pieceX = hexX - (pieceWidth / 2) // half way through the image, centered in the current tile
  const pieceY = hexY - pieceHeight + 30; // bottom of piece should be in center, but offset a little lower to compensate for isometric angle (hence 30 px)
  ctx.drawImage(piece, pieceX, pieceY, pieceWidth, pieceHeight);
}

const update = () => {
  const [mouseXGrid, mouseYGrid] = fromHex(mouseX, mouseY);
  const mouseOverPiece = hasMouse && pieces.some(piece => piece.x === mouseXGrid && piece.y === mouseYGrid);

  if (isMouseDown) {
    console.log(`Grid Position: (${mouseXGrid}, ${mouseYGrid})`);
    const hasSelectedPiece = selectedPiece !== undefined
    if (mouseOverPiece) {
      const isOverSelectedPiece = hasSelectedPiece && selectedPiece.x === mouseXGrid && selectedPiece.y === mouseYGrid;
      // toggle if same piece
      if (isOverSelectedPiece) {
        selectedPiece = undefined;
      } else {
        selectedPiece = pieces.find(piece => piece.x === mouseXGrid && piece.y === mouseYGrid);
      }
    } else if (hasSelectedPiece) {
      // check if the user clicked on a neighboring cell
      const neighbors = getHexNeighborCells(selectedPiece.x, selectedPiece.y);
      const matchingNeighbor = neighbors.find(cell => cell.x === mouseXGrid && cell.y === mouseYGrid);
      const hasMatch = matchingNeighbor !== undefined;
      if (hasMatch) {
        // move the selected piece to the cell where the mouse is
        const piece = pieces.find(piece => piece.x === selectedPiece.x && piece.y === selectedPiece.y)
        piece.x = mouseXGrid
        piece.y = mouseYGrid
        // clear the selection after move
        selectedPiece = undefined;
      }
    }

    isMouseDown = false;
  }
};

const draw = () => {
  // clear background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // draw hex grid
  const GRID_SIZE = canvas.width / HEX_RADIUS;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      drawHexagon(ctx, x, y, HEX_RADIUS, COMPLIMENTARY_COLOR);
    }
  }

  // draw a highlighted hexagon where the mouse is
  const [mouseXGrid, mouseYGrid] = fromHex(mouseX, mouseY);
  const mouseOverPiece = hasMouse && pieces.some(piece => piece.x === mouseXGrid && piece.y === mouseYGrid);
  if (mouseOverPiece) {
    drawHexagon(ctx, mouseXGrid, mouseYGrid, HEX_RADIUS, COLOR, COLOR);
  }

  // highlight the pieces around the selected piece
  if (selectedPiece !== undefined) {
    const neighbors = getHexNeighborCells(selectedPiece.x, selectedPiece.y);
    neighbors.forEach(cell => {
      drawHexagon(ctx, cell.x, cell.y, HEX_RADIUS, COLOR, COLOR);
    })
  }

  // draw each of the pieces
  pieces.forEach((piece) => {
    drawPieceOnHex(piece.x, piece.y);
  })

  drawCursor();
};

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
}

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const onMouseMove = (e) => {
  hasMouse = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const onMouseLeave = () => {
  hasMouse = false;
  mouseX = 0;
  mouseY = 0;
};

const onMouseDown = () => {
  isMouseDown = true;
};

const onMouseUp = () => {
  isMouseDown = false;
};

init: {
  // resize hte canvas to fit the window, and setup a resize handler to resize on change
  resize();
  window.addEventListener('resize', resize);

  // mouse event handlers
  canvas.addEventListener('mouseenter', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);

  // start the game loop
  requestAnimationFrame(loop);
}