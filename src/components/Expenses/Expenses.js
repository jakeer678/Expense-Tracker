import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Expenses.css";
import { userContext } from "../../store/ContextStore";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../store/ExpenseSlice";

const Expenses = () => {
  const dispatch = useDispatch();
  const amountSpentRef = useRef();
  const descriptionRef = useRef();
  const productTypeRef = useRef();

  // const { addExpenssetLists } = useContext(userContext);
  const [editInput, setEditInput] = useState(false);
  const theme = useSelector((state) => state.theme.isThemeActivate);

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
    if (!editInput) {
      try {
        const response = await axios.post(
          `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`,
          data
        );

        const responseData = response.data;
        console.log(responseData, "uuuuu");
        fetchData();
      } catch (err) {
        console.log(err);
      }
      // addExpenssetLists(data);

      if (editInput) {
        const response = await axios.put(
          `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`,
          data
        );
        const responseData = response.data;
        console.log(responseData);

        setEditInput(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="expenses">
        <form onSubmit={submitHandler}>
          <div>
            <label>Amount spent</label>
            <input type="number" ref={amountSpentRef} />
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
          {!editInput && (
            <div>
              <button type="submit">Add Items</button>
            </div>
          )}
          {editInput && (
            <div>
              <button type="submit">Update Items</button>
            </div>
          )}
        </form>
        <div>{<ExpenseList fetchData={fetchData} />}</div>
      </div>
    </Fragment>
  );
};

export default Expenses;
