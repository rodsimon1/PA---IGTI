import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deleteItem, saveItem } from '../../../actions/items';

const Item = ({ item, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const saved = item.isSaved ? <strong>Saved</strong> : <div>Save</div>;
  const savedIcon = item.isSaved ? (
    <FavoriteIcon fontSize="small" />
  ) : (
    <FavoriteBorderIcon fontSize="small" />
  );

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={item.selectedFile} name={item.name} />

      <div className={classes.overlay}>
        <Typography variant="h6">{item.owner}</Typography>
        <Typography variant="body2">{moment(item.createdAt).fromNow()}</Typography>
      </div>

      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(item._id)}>
          <MoreHoriz fontSize="default"></MoreHoriz>
        </Button>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {item.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h6" gutterBottom>
        {item.name}
      </Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Phone Number: <strong>{item.phoneNumber}</strong>
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(saveItem(item._id))}>
          {savedIcon}
          {saved}
        </Button>

        <Button size="small" color="secondary" onClick={() => dispatch(deleteItem(item._id))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
