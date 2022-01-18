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
    owner: '',
    phoneNumber: '',
    tags: '',
    selectedFile: '',
  });
  const item = useSelector((state) =>
    currentId ? state.items.find((i) => i._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) setItemData(item);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateItem(currentId, itemData));
      console.log(itemData);
    } else {
      dispatch(createItem(itemData));
      console.log(itemData);
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setItemData({
      name: '',
      description: '',
      owner: '',
      phoneNumber: '',
      tags: '',
      selectedFile: '',
    });
  };

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
          label="Name"
          fullWidth
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={itemData.description}
          onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />
        <TextField
          name="owner"
          variant="outlined"
          label="Owner"
          fullWidth
          value={itemData.owner}
          onChange={(e) => setItemData({ ...itemData, owner: e.target.value })}
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
