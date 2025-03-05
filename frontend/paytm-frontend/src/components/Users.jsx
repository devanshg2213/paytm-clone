import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/bulk?search=" + search)
      .then((res) => setUsers(res.data.user));
  }, [search]);
  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Users ..."
          className="w-full px-2 py-1 border rounder border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};
function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between ">
      <div className="flex ">
        {/* Avatar Placeholder */}
        <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center mr-2 mt-1">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      {/* Optional: Add a follow button or action */}
      <div className="flex flex-col justify-center h-full ">
        <Button
          onClick={() => {
            navigate(
              `/send?id=${user._id} name=${user.firstName} ${user.lastName}`
            );
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
}
