import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import { AnimatePresence } from "framer-motion";
import classes from "./List.module.css";
const List = (props) => {
  const [deleteItem, setDeleteItem] = useState({});
  const closeHandler = () => {
    setDeleteItem({});
  };
  return (
    <>
      <AnimatePresence>
        {Object.keys(deleteItem).length !== 0 && (
          <ErrorBox successFlag={deleteItem} onClose={closeHandler} />
        )}
      </AnimatePresence>
      <ul className={classes["list-cont"]}>
        {props.listItems.map((item) => (
          <li className={classes["item-cont"]} key={item.id}>
            <div className={classes["input-cont"]}>
              <input
                type="checkbox"
                id={item.id}
                onClick={() => props.onCheck(item.id)}
                defaultChecked={item.isChecked}
              />
              <label
                className={`${classes.line} ${
                  item.isChecked ? classes.check : ""
                }`}
                htmlFor={item.id}
              >
                {item.name}
              </label>
            </div>
            <button
              onClick={() => {
                props.onDelete(item.id);
                setDeleteItem((prevState) => {
                  return { msg: "Item Deleted.", flag: "Success" };
                });
              }}
              className={classes.delete}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
