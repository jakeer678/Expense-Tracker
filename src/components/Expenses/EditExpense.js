import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./EditExpense.css";

const EditExpense = (props) => {
  const [moneySpent, setMoneySpent] = useState(props.moneySpent);
  const [description, setDescription] = useState(props.description);
  const [productType, setProductType] = useState(props.productType);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      moneySpent: Math.floor(moneySpent),
      description: description,
      productType: productType,
    };

    try {
      await axios.put(
        `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
        data
      );
      props.fetchData();
      props.onSave();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="authopen">
      <form onSubmit={submitHandler}>
        <div className="control">
          <label>Amount spent</label>
          <input
            type="number"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
          />
        </div>
        <div className="control">
          <label>Description of the Expenses</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="control">
          <select
            className="select_edit"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>

        <div className="flex justify-between flex-row-reverse mt-4">
          <Button variant="outlined" type="submit" onClick={() => props.onSave}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
