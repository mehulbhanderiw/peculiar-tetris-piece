import { FC, useEffect, useState } from "react";
import { Rotate, RotateReverse } from "@/Icons";
import { gridToString, rotateGrid } from "@/utils";
import { Direction, GridProps } from "@/types";
import { useRouter } from "next/router";
import styles from "@/styles/Grid.module.css";

export const Grid: FC<GridProps> = ({ initialGrid }) => {
  const router = useRouter();
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    const isAllFalse = grid.flat().every((cell) => !cell);

    if (isAllFalse) {
      router.push(`/`);
    } else {
      const gridString = gridToString(grid);
      router.push(`/?grid=${gridString}`, undefined, { shallow: true });
    }
  }, [grid]);

  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const rotateGrid90 = () => setGrid(rotateGrid(grid));

  const rotateGridNegative90 = () =>
    setGrid(rotateGrid(grid, Direction.COUNTERCLOCKWISE));

  return (
    <div className={styles.container}>
      <button onClick={rotateGridNegative90} className={styles.rotateButton}>
        <RotateReverse />
      </button>
      <div className={styles.gridContainer}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${styles.cell} ${cell ? styles.cellActive : ""}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <button onClick={rotateGrid90} className={styles.rotateButton}>
        <Rotate />
      </button>
    </div>
  );
};
