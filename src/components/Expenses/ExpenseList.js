// import React, { useContext } from "react";
// import { userContext } from "../../store/ContextStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { themeActions } from "../../store/ThemeSlice";

const ExpenseList = ({ fetchData }) => {
  //   // const { list, deleteItems } = useContext(userContext);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.isThemeActivate);
  const listItems = useSelector((state) => state.expense.expenseItem);

  console.log(listItems, "Aakakak");

  const Petrol = listItems?.filter((item) => {
    if (item.productType === "Petrol") return item;
  });
  const food = listItems?.filter((item) => {
    if (item.productType === "food") return item;
  });
  const salary = listItems?.filter((item) => {
    if (item.productType === "salary") return item;
  });

  const totalAmount = listItems.reduce((acc, cur) => {
    return acc + cur.moneySpent;
  }, 0);

  const deleteItems = async (id) => {
    const response = await axios.delete(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    const responseData = response.data;
    fetchData();
    console.log(responseData);
  };

  const themeSWitchHanfler = () => {
    dispatch(themeActions.themeActivation());
  };

  const expenseDownload = [];

  console.log(expenseDownload, "jakersasasasa");
  listItems.forEach((element) => {
    expenseDownload.push([
      element.moneySpent,
      element.productType,
      element.description,
    ]);
  });

  const expenseDownload2 = expenseDownload
    .map((row) => row.join("."))
    .join(".\n");

  const blob = new Blob([expenseDownload2]);
  const urlDownload = URL.createObjectURL(blob);

  return (
    <>
      <div>
        <div>{totalAmount}</div>
        <div>
          {totalAmount > 1000 && (
            <div>
              <button onClick={themeSWitchHanfler}>
                {theme ? "Premium-Dark" : "Premium-Light"}
              </button>
            </div>
          )}
          <a href={urlDownload} download="Expense.csv">
            Download Expense
          </a>
        </div>
        {console.log(Petrol, "pppppppp")}
        {Petrol.map((item) => {
          return (
            <div key={item.id}>
              <li>{item.moneySpent}</li>
              <li>{item.description}</li>
              <div>
                <button onClick={() => deleteItems(item.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {food?.map((item) => {
          return (
            <div key={item.id}>
              <li>{item.moneySpent}</li>
              <li>{item.description}</li>
              <div>
                <button onClick={() => deleteItems(item.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {salary?.map((item) => {
          return (
            <div key={item.id}>
              <li>{item.moneySpent}</li>
              <li>{item.description}</li>
              <div>
                <button onClick={() => deleteItems(item.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseList;
