import React from 'react';

import classes from './Recipe.module.css';
import Auxiliar from '../../hoc/auxiliar';

const recipe = (props) => (
  <Auxiliar>
    <tr key={props.name} className={classes.Recipe + (props.isChecked ? " " + classes.active : '')}>
      <td>
        <label htmlFor={props.name}>
          <input
            type="checkbox"
            id={props.name}
            value={props.name}
            onChange={props.clicked} />
        </label>
      </td>
      <td>
        <label htmlFor={props.name}>{props.name}</label>
      </td>
      <td>
        <label htmlFor={props.name}>{props.type}</label>
      </td>
      <td>
        <label htmlFor={props.name}>{props.time} min</label>
      </td>
    </tr>
  </Auxiliar>
);

export default recipe;