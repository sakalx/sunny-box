import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const StationCard = () => {

  return (
    <Paper elevation={1}>
      <ButtonBase>
           <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              Title
              <span className={classes.imageMarked}/>
            </Typography>
          </span>
      </ButtonBase>
    </Paper>
  );
};

export default StationCard;