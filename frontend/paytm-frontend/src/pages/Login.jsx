import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 flex justify-center  h-screen">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white p-2 w-80 text-center h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access acount"} />

          <InputBox label={"Email"} placeholder={"devansh@gmail.com"} />
          <InputBox label={"Password"} placeholder={"********"} />
          <div className="pt-4">
            <Button
              onClick={() => {
                navigate("/dashboard");
              }}
              label={"Sign In"}
            />
          </div>
          <BottomWarning
            label={"You don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
