import React, { Fragment, useState } from "react";

import { Checkbox, Typography } from "@mui/material";

const TodoItem = () => {
  const [checked, setChecked] = useState(false);

  const controlTodo = (event) => {
    if (event.target.checked) {
      console.log("check");
      setChecked(true);
    }
  };

  return (
    <Fragment>
      <Checkbox onChange={controlTodo} />
    </Fragment>
  );
};

export default TodoItem;
