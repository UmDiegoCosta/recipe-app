import React from 'react';

import Auxiliar from '../../hoc/auxiliar';

const recipe = (props) => (
  <Auxiliar>
    <tr key={props.name}>
      <td>
        <input
          type="checkbox"
          id={props.name}
          value={props.name}
          onChange={props.clicked} />
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