import React, { useState, useEffect } from "react";
import List from "./List";
import Card from "../UI/Card";
import ErrorBox from "./ErrorBox";
import { AnimatePresence } from "framer-motion";
import classes from "./GroceryForm.module.css";

const GroceryForm = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);
  const [success, setSuccess] = useState({});
  const inputHandler = (event) => {
    setInputText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputText) {
      let newItem = {
        id: Math.random().toString(),
        name: inputText,
        isChecked: false,
      };

      setList((prevState) => [newItem, ...prevState]);
      setSuccess((prevState) => {
        return { msg: "Item Added To The List", flag: "Success" };
      });
    } else if (inputText.trim().length === 0) {
      setSuccess((prevState) => {
        return { msg: "Please Provide a Value.", flag: "Error" };
      });
    }
    setInputText("");
  };

  const deleteHandler = (itemId) => {
    let newArray = list.filter((item) => item.id !== itemId);
    if (newArray.length === 0) {
      localStorage.removeItem("list");
    }
    setList((prevState) => [...newArray]);
  };

  const checkHandler = (itemId) => {
    let newArray = list.map((item) => {
      if (item.id === itemId) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setList((prevState) => [...newArray]);
  };

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("list"));
    if (items && items.length > 0) {
      setList((prevState) => [...items]);
    }
  }, []);

  const closeHandler = () => {
    setSuccess({});
  };

  return (
    <>
      <AnimatePresence>
        {Object.keys(success).length !== 0 && (
          <ErrorBox successFlag={success} onClose={closeHandler} />
        )}
      </AnimatePresence>
      <Card className={classes["list-container"]}>
        <div className={classes["form-container"]}>
          <h3 className={classes.heading}>Grocery Bud</h3>
          <form onSubmit={submitHandler}>
            <input
              className={classes.input}
              type="text"
              id="grocery"
              onChange={inputHandler}
              value={inputText}
            />
            <button className={classes.btn}>Add Item</button>
          </form>
        </div>
        {list && list.length > 0 && (
          <List
            onCheck={checkHandler}
            onDelete={deleteHandler}
            listItems={list}
          />
        )}
      </Card>
    </>
  );
};

export default GroceryForm;
