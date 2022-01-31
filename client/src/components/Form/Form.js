import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createItem, updateItem } from '../../actions/items';

const Form = ({ currentId, setCurrentId }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    phoneNumber: '',
    tags: '',
    selectedFile: '',
  });
  const item = useSelector((state) =>
    currentId ? state.items.find((i) => i._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (item) setItemData(item);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createItem({ ...itemData, userName: user?.result?.name }));
      console.log('user result', user?.result);
      console.log('itemData', itemData);
      clear();
    } else {
      dispatch(updateItem(currentId, { ...itemData, userName: user?.result?.name }));
      console.log('itemdata', itemData);
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setItemData({
      name: '',
      description: '',
      phoneNumber: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to list an item or save other's items
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        action=""
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Edit' : 'List'} an Item</Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Item Name"
          fullWidth
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label=" Description"
          fullWidth
          value={itemData.description}
          onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />

        <TextField
          name="phoneNumber"
          variant="outlined"
          label="Phone Number"
          fullWidth
          value={itemData.phoneNumber}
          onChange={(e) => setItemData({ ...itemData, phoneNumber: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={itemData.tags}
          onChange={(e) => setItemData({ ...itemData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setItemData({ ...itemData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="Secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
