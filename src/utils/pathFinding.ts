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

  const queue: {
    row: number
    col: number
    path: { cell: number; direction: 'left' | 'right' | 'top' | 'bottom' | null }[]
  }[] = [{ ...start, path: [{ cell: currentPosition, direction: null }] }]
  const visited = new Set<number>()
  visited.add(currentPosition)

  const directions = [
    { dr: -1, dc: 0, dir: 'top' },
    { dr: 1, dc: 0, dir: 'bottom' },
    { dr: 0, dc: -1, dir: 'left' },
    { dr: 0, dc: 1, dir: 'right' },
  ] as const

  while (queue.length > 0) {
    const { row, col, path } = queue.shift()!

    if (row === target.row && col === target.col) {
      let result = path
      if (npcSelected) {
        result = result.slice(0, -1)
      }
      return result
    }

    for (const { dr, dc, dir } of directions) {
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
          queue.push({
            row: newRow,
            col: newCol,
            path: [...path, { cell: newIndex, direction: dir }],
          })
        }
      }
    }
  }

  return []
}
