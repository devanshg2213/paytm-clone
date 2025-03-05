import axios from "axios";
import React, { useEffect, useState } from "react";
export const Balance = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    axios
      .get("http://localhost:3000/api/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBalance(res.data.balance));
  }, []);
  return <div className="bg-slate-100 p-4 rounded-lg">
    <h2 className="text-lg font-semibold">Balance: {balance}</h2>

  </div>;
};
