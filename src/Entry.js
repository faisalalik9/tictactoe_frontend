import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

function Entry() {
  let navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen w-full overflow-hidden lg:w-1/4">
      <div className="h-4/5 flex justify-center items-center">
        <div className="font-b text-center">
          <p className="text-4xl mb-6">async</p>
          <h1 className="text-8xl mb-4">tic tac</h1>
          <h1 className="text-8xl">toe</h1>
        </div>
      </div>
      <div className="h-1/5 font-epl">
        <div className="px-6">
          <div className="mb-6">
            <Button
              handleClick={handleLoginClick}
              text="Login"
              color="yellow"
            />
          </div>
          <Button
            handleClick={handleRegisterClick}
            text="Register"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Entry;
