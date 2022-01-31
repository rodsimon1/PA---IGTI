import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = (props) => {
  return (
    <Grid item xs={12} sm={props.half ? 6 : 12}>
      <TextField
        name={props.name}
        onChange={props.handleChange}
        label={props.label}
        variant="outlined"
        required
        fullWidth
        autoFocus={props.autoFocus}
        type={props.type}
        InputProps={
          props.name === 'password' // cant use && below
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={props.handleShowPassword}>
                      {props.type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
