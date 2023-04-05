import React, { useEffect, useState } from "react";
import { userContext } from "./ContextStore";
import axios from "axios";

const ContextProvider = (props) => {
  const initialValue = localStorage.getItem("idToken");
  const [token, setToken] = useState(initialValue);
  const [list, setList] = useState([]);
  console.log(list, "lllllllaajaj");

  const setListExpenses = async () => {
    const response = await axios.get(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`
    );
    const responseData = response.data;
    console.log(responseData, "sasasasa");
    setList(responseData);
  };

  const addExpenssetLists = async (data) => {
    const response = await axios.post(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`,
      data
    );
    const responseData = response.data;
    console.log(responseData);
    setList([...list, data]);
    setListExpenses();
  };

  const deleteItems = async () => {
    const response = await axios.delete(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/${expenses.name}.json`
    );

    const responseData = response.data;
    console.log(responseData, "tttttttt");
    setListExpenses();
  };

  // const deleteItems = (name) => {
  //   const deleteItem = list.filter((item) => item.name !== name);
  //   setList(deleteItem);
  // };

  const editItems = (name) => {};

  const isLoggedIn = !!token;
  const LoginUserHandle = (idToken) => {
    setToken(idToken);
    localStorage.setItem("idToken", idToken);
  };

  const LogoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const contextValue = {
    token: token,
    LoginUserHandle: LoginUserHandle,
    LogoutHandler: LogoutHandler,
    isLoggedIn: isLoggedIn,
    addExpenssetLists: addExpenssetLists,
    list: list,
    deleteItems: deleteItems,
  };

  useEffect(() => {
    setListExpenses();
  }, []);
  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default ContextProvider;
