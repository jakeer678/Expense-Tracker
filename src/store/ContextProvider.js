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
    setList([]);
    for (let key in responseData) {
      setList((prev) => [...prev, { id: key, ...responseData[key] }]);
    }
    // setList(responseData);
  };

  const addExpenssetLists = async (data) => {
    const response = await axios.post(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses.json`,
      data
    );
    const responseData = response.data;
    console.log(responseData);
    setList([...list, data]);
    console.log([...list, data], "ppppppp");
    setListExpenses();
  };

  const deleteItems = async (id) => {
    const response = await axios.delete(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses/${id}.json`
    );

    const responseData = response.data;
    console.log(responseData, "tttttttt");
    setListExpenses();
  };

  const editItems = (name) => {};

  const isLoggedIn = !!token;
  // const LoginUserHandle = (idToken) => {
  //   setToken(idToken);
  //   localStorage.setItem("idToken", idToken);
  // };

  // const LogoutHandler = () => {
  //   setToken(null);
  //   localStorage.clear();
  // };

  const contextValue = {
    token: token,
    // LoginUserHandle: LoginUserHandle,
    // LogoutHandler: LogoutHandler,
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
