import React, { Fragment, useEffect, useRef } from "react";
import "./Expenses.css";
// import { userContext } from "../../store/ContextStore";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../store/ExpenseSlice";
import TotalExpense from "./TotalExpense";
import "./Expenses.css";
import { Button } from "@mui/material";
import DownloadExp from "./DownloadExp";

const Expenses = () => {
  const dispatch = useDispatch();
  const amountSpentRef = useRef();
  const descriptionRef = useRef();
  const productTypeRef = useRef();
  const listItems = useSelector((state) => state.expense.expenseItem);
  // const { addExpenssetLists } = useContext(userContext);

  const fetchData = async () => {
    const response = await axios.get(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`
    );
    const responseData = response.data;
    console.log(responseData, "pppppppp");
    const expenseItem = [];

    for (let key in responseData) {
      expenseItem.push({ id: key, ...responseData[key] });
    }
    dispatch(expenseSliceActions.addExpense(expenseItem));
    console.log(expenseItem, "ooooooooo");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      moneySpent: Math.floor(amountSpentRef.current.value),
      description: descriptionRef.current.value,
      productType: productTypeRef.current.value,
    };

    try {
      const response = await axios.post(
        `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`,
        data
      );

      const responseData = response.data;
      console.log(responseData,);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <section className="auth">
        <div className="total">
          <TotalExpense />
        </div>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label htmlFor="amount">Amount spent</label>
            <input type="number" ref={amountSpentRef} />
          </div>
          <div className="control">
            <label htmlFor="description">Description of the Expenses</label>
            <input type="text" ref={descriptionRef} />
          </div>
          <div>
            <select ref={productTypeRef}>
              <option value="food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="salary">Salary</option>
            </select>
          </div>

          <div className="actions">
            <Button type="submit" variant="contained" className="toggle">
              Add Expenses
            </Button>
          </div>
        </form>
        <div className="download_btn">
          <DownloadExp />
        </div>

        <div>
          {listItems.map((item) => (
            <ExpenseList
              fetchData={fetchData}
              key={item.id}
              id={item.id}
              price={item.moneySpent}
              description={item.description}
              productType={item.productType}
            />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Expenses;
