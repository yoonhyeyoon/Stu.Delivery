import React, { useState } from "react";

import { Checkbox, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  checked: {
    textDecoration: "line-through",
  },
  unChecked: {
    textDecoration: "none",
  },
});

const TodoItem = ({
  index,
  primary,
  complete,
  setComplete,
  todos,
  percent,
  setPercent,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const checkHandler = (event) => {
    setChecked(checked);

    if (!checked) {
      setComplete((complete) => complete + 1);
    } else {
      setComplete((complete) => complete - 1);
    }

    setPercent((percent) => complete / todos.length);
  };

  return (
    <ListItem key={index}>
      <Checkbox onChange={checkHandler} />
      <ListItemText
        primary={primary}
        className={checked ? classes.checked : classes.unChecked}
      />
    </ListItem>
  );
};

export default TodoItem;
