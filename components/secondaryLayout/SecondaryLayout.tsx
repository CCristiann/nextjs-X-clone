import React from "react";

import SecondaryFooter from "./SecondaryFooter";
import Banner from "./Banner";
import SignUpForm from "./SignUpForm";

const SecondaryLayout = () => {
  return (
    <div className="flex h-fit w-screen flex-col justify-between md:h-full md:max-h-screen">
      <div className="flex flex-col-reverse md:h-fit md:flex-row">
        <Banner />
        <SignUpForm />
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default SecondaryLayout;
