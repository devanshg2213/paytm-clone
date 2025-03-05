import { useState } from "react";
import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 flex justify-center  h-screen">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white p-2 w-80 text-center h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Create an account"} />
          <InputBox
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"john"}
          />
          <InputBox
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"doe"}
          />
          <InputBox
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"********"}
          />
          <div className="pt-4">
            <Button
              onClick={async() => {
                await axios
                  .post("http://localhost:3000/api/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password,
                  })
                  .then((res) => {
                    alert(res.data.message);
                    localStorage.setItem("token", res.data.token);
                    navigate("/login");
                  }) 
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Login"}
            to={"/login"}
          />
        </div>
      </div>
    </div>
  );
};
