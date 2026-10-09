import { Loader } from '@mantine/core';
import classes from './LoadingCircle.module.css';

export default function LoadingCircle() {
  return (
    <div className={classes.container}>
      <Loader className={classes.loader} color="blue.4" />
    </div>
  );
}
