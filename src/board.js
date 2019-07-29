
export default function initBoard(being) {

  const scale = being.options.scale

  var board = [ scale ]

  for(var i=0; i<scale; i++){
    board[i] = [ scale ]
    for(var j=0; j<scale; j++){
      board[i][j]=0
    }
  }

  being.board = board
}

export function setBoard(being, x, y) {

  const scale = being.options.scale

  let sx = Math.floor( x / being.maxX * scale)
  let sy = Math.floor( y / being.maxY * scale)

  if (sx < 0 ) sx = 0
  if (sx >= scale ) sx = scale-1
  if (sy < 0 ) sy = 0
  if (sy >= scale ) sy = scale-1


  if (being.boardX != sx || being.boardY != sy) {

    if (being.boardX != -1) {
      being.board[being.boardX][being.boardY]--
    }
    being.board[sx][sy]++
    being.boardX = sx
    being.boardY = sy
  }

  if (being.board[sx][sy]==0) return 0

  return being.board[sx][sy]-1
}

export function checkBoard(being, x, y) {

  const scale = being.options.scale

  let sx = Math.floor( x / being.maxX * scale)
  let sy = Math.floor( y / being.maxY * scale)

  if (sx < 0 ) sx = 0
  if (sx >= scale ) sx = scale-1
  if (sy < 0 ) sy = 0
  if (sy >= scale ) sy = scale-1

  let nDec = 0

  if (being.boardX == sx && being.boardY == sy){
    nDec = 1
  }

  return being.board[sx][sy] - nDec
}
