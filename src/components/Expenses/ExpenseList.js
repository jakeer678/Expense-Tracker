// import React, { useContext } from "react";
// import { userContext } from "../../store/ContextStore";
import { useSelector } from "react-redux";
import axios from "axios";

const ExpenseList = ({ fetchData }) => {
  //   // const { list, deleteItems } = useContext(userContext);

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

  return (
    <>
      <div>
        <div>{totalAmount}</div>
        <div>
          {totalAmount > 1000 && (
            <div>
              <button>Premium button</button>
            </div>
          )}
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
