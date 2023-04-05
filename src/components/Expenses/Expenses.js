import React, { Fragment, useContext, useRef, useState } from "react";
import "./Expenses.css";
import { userContext } from "../../store/ContextStore";
import ExpenseList from "./ExpenseList";

const Expenses = () => {
  const inputIdRef = useRef();
  const moneySpentRef = useRef();
  const descriptionRef = useRef();
  const productTypeRef = useRef();
  const { addExpenssetLists } = useContext(userContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: Math.floor(inputIdRef.current.value),
      moneySpent: Math.floor(moneySpentRef.current.value),
      description: descriptionRef.current.value,
      productType: productTypeRef.current.value,
    };

    addExpenssetLists(data);
  };

  return (
    <Fragment>
      <div className="expenses">
        <form onSubmit={submitHandler}>
          <div className="inputProduct">
            <label>Product Id</label>
            <input min="1" type="number" ref={inputIdRef}></input>
          </div>
          <div>
            <label>Money spent</label>
            <input type="number" ref={moneySpentRef} />
          </div>
          <div>
            <label>Description of the Expenses</label>
            <input type="text" ref={descriptionRef} />
          </div>
          <div>
            <select ref={productTypeRef}>
              <option value="food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <div>
            <button type="submit">Add Expenses</button>
          </div>
        </form>
        <ExpenseList />
      </div>
    </Fragment>
  );
};

export default Expenses;
