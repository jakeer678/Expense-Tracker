import React from "react";
import { useSelector } from "react-redux";
import "./TotalExp.css";

const DownloadExp = () => {
  const listItems = useSelector((state) => state.expense.expenseItem);
  //Here we are downloading the Expense list from the redux-store
  const expenseDownload = [];
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
    <div className="download">
      <a href={urlDownload} download="Expense.csv">
        Download Expense
      </a>
    </div>
  );
};

export default DownloadExp;
