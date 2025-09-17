import { npcs } from './npcs'

export async function calculatePath(
  currentPosition: number,
  targetPosition: number,
  numRows: number,
  numCols: number,
  obstacles: number[],
  npcSelected: boolean,
) {
  function toCoord(pos: number) {
    return {
      row: Math.floor((pos - 1) / numCols),
      col: (pos - 1) % numCols,
    }
  }

  function toIndex(row: number, col: number) {
    return row * numCols + col + 1
  }

  const start = toCoord(currentPosition)
  const target = toCoord(targetPosition)

  const queue: { row: number; col: number; path: number[] }[] = [
    { ...start, path: [currentPosition] },
  ]
  const visited = new Set<number>()
  visited.add(currentPosition)

  const directions = [
    { dr: -1, dc: 0 }, // up
    { dr: 1, dc: 0 }, // down
    { dr: 0, dc: -1 }, // left
    { dr: 0, dc: 1 }, // right
  ]

  while (queue.length > 0) {
    const { row, col, path } = queue.shift()!

    if (row === target.row && col === target.col) {
      if (npcSelected) {
        path.pop()
        return path
      }
      return path
    }

    for (const { dr, dc } of directions) {
      const newRow = row + dr
      const newCol = col + dc

      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        const newIndex = toIndex(newRow, newCol)
        if (
          !visited.has(newIndex) &&
          !obstacles.includes(newIndex) &&
          !npcs.some((n) => n.position === newIndex && !npcSelected)
        ) {
          visited.add(newIndex)
          queue.push({ row: newRow, col: newCol, path: [...path, newIndex] })
        }
      }
    }
  }

  return []
}
