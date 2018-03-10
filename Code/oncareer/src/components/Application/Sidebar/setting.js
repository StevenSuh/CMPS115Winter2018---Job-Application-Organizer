import React from 'react';

import classes from './styles.css';

const Setting = (props) => {
  return (
    <div className={classes.setting}>
      <button className={classes.setting_delete}>Delete Account</button>
    </div>
  );
}

export default Setting;