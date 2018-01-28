import React from 'react';

import pic from './Dashboard.svg';
import classes from './Screenshot.css';

const Screenshot = (props) => (
    <div className={classes.screenshot} style={{height: props.height}}>
        <img src={pic} width='100%' height='100%' />
    </div>
);

export default Screenshot;
