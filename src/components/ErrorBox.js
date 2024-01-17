import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import ProgressBar from "../UI/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./ErrorBox.module.css";

const ErrorBox = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const enterHandler = () => {
    setIsHovered(true);
  };

  const leaveHandler = () => {
    setIsHovered(false);
  };
  let errorCheck;
  if (Object.keys(props.successFlag).length !== 0) {
    errorCheck = props.successFlag?.flag.toLowerCase();
  }
  return (
    <>
      {ReactDOM.createPortal(
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
            bounce: 0.4,
            type: "spring",
          }}
          exit={{ y: -100 }}
          className={classes["box-cont"]}
          onMouseEnter={enterHandler}
          onMouseLeave={leaveHandler}
        >
          <div className={classes.box}>
            <FontAwesomeIcon
              onClick={() => props.onClose()}
              className={classes.close}
              icon={faXmark}
            />

            <div className={classes.content}>
              <div
                className={classes.pass}
                style={{
                  backgroundColor: `${
                    errorCheck === "success" ? "#07bc0c" : "#e74c3c"
                  }`,
                }}
              >
                {errorCheck === "success" ? (
                  <FontAwesomeIcon
                    className={classes["check-icon"]}
                    icon={faCheck}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={classes.warn}
                    icon={faExclamation}
                  />
                )}
              </div>
              <p className={classes.text}>{props.successFlag?.msg}</p>
            </div>
            <ProgressBar
              hovered={isHovered}
              className={classes.progess}
              totalTime={5}
              closeBox={props.onClose}
              color={errorCheck === "success" ? "#07bc0c" : "#e74c3c"}
            />
          </div>
        </motion.div>,
        document.getElementById("error-root")
      )}
    </>
  );
};

export default ErrorBox;
