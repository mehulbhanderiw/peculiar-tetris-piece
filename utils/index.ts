import { Direction } from "@/types";

export const parseGridFromQuery = (query: string | undefined): boolean[][] => {
  const defaultState = Array(5).fill(Array(5).fill(false));

  if (!query) return defaultState;

  try {
    return JSON.parse(atob(query));
  } catch (error) {
    return defaultState;
  }
};

export const gridToString = (grid: boolean[][]): string => {
  return btoa(JSON.stringify(grid));
};

export const rotateGrid = (
  grid: boolean[][],
  direction: Direction = Direction.CLOCKWISE
): boolean[][] => {
  const size = grid.length;
  const newGrid = Array.from({ length: size }, () => Array(size).fill(false));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const newRow = direction === Direction.CLOCKWISE ? col : size - 1 - col;
      const newCol = direction === Direction.CLOCKWISE ? size - 1 - row : row;
      newGrid[newRow][newCol] = grid[row][col];
    }
  }

  return newGrid;
};
