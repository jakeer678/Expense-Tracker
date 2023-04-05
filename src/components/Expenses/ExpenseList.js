import React, { useContext } from "react";
import { userContext } from "../../store/ContextStore";

const ExpenseList = () => {
  const { list, deleteItems } = useContext(userContext);

  // const result = Object.keys(data).map(key => data[key]);
  const Petrol = list?.filter((item) => {
    if (item.productType === "Petrol") return item;
  });
  const food = list?.filter((item) => {
    if (item.productType === "food") return item;
  });
  const salary = list?.filter((item) => {
    if (item.productType === "salary") return item;
  });
  return (
    <>
      <div>
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
