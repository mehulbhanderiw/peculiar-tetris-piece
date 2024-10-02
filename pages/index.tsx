import { GetServerSideProps, NextPage } from "next";
import { Grid } from "@/components";
import { parseGridFromQuery } from "@/utils";
import { HomeProps } from "@/types";
import styles from "@/styles/Home.module.css";

const Home: NextPage<HomeProps> = ({ initialGrid }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A Peculiar Tetris Piece</h1>
      <Grid initialGrid={initialGrid} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryGrid = context.query.grid as string | undefined;
  const initialGrid = parseGridFromQuery(queryGrid);

  return {
    props: {
      initialGrid,
    },
  };
};

export default Home;
