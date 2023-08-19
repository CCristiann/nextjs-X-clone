import React from "react";

import SecondaryFooter from "./SecondaryFooter";

import Banner from "./Banner";
import SignUpForm from "./SignUpForm";

const SecondaryLayout = () => {
  return (
    <div className="h-fit w-screen md:max-h-screen md:h-full flex flex-col justify-between">
      <div className="flex flex-col-reverse md:flex-row md:h-fit">
        <Banner />
        <SignUpForm />
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SecondaryLayout;
