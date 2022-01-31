// import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Circular, CircularProgress } from '@material-ui/core';

import Item from './Item/Item';
import useStyles from './styles';

const Items = ({ setCurrentId }) => {
  const items = useSelector((state) => state.items); // why '.items'? Named in reducers index
  const classes = useStyles();

  return !items.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {items.map((item) => (
        <Grid key={item._id} item xs={12} sm={6}>
          <Item item={item} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Items;
