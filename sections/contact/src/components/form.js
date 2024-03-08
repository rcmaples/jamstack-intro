import React, { useReducer } from "react";
import * as styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
};

// {type: "do something", name: "jason"}
const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };

    case "updateStatus":
      return { ...state, status: action.status };

    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) =>
    dispatch({
      type: "updateStatus",
      status,
    });

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("PENDING");

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus("SUCCESS");
      })
      .catch((err) => {
        console.error(err);
        setStatus("ERROR");
      });

    return;
  };

  if (state.status === "SUCCESS") {
    return (
      <>
        <p className={styles.success}>Message sent!</p>
        <button
          type="reset"
          onClick={() => dispatch({ type: "reset" })}
          className={`${styles.button} ${styles.centered}`}>
          Reset
        </button>
      </>
    );
  }

  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
        onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          id="name"
          type="text"
          name="name"
          value={state.name}
          onChange={updateFieldValue("name")}
        />
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          type="email"
          name="email"
          value={state.email}
          onChange={updateFieldValue("email")}
        />
        <label className={styles.label} htmlFor="subject">
          Subject
        </label>
        <input
          className={styles.input}
          id="subject"
          type="text"
          name="subject"
          value={state.subject}
          onChange={updateFieldValue("subject")}
        />
        <label className={styles.label} htmlFor="body">
          Body
        </label>
        <textarea
          className={styles.input}
          id="body"
          name="body"
          value={state.body}
          onChange={updateFieldValue("body")}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </>
  );
};

export default Form;
