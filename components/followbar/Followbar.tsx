import React from "react";

import FollowbarUsers from "./FollowbarUsers";

const Followbar = () => {
  return (
    <div className="hidden lg:sticky w-fit h-fit top-0 lg:block paddings">
      <div className="bg-neutral-800 rounded-xl px-4">
        <h4 className="text-white font-semibold text-xl pt-4">Who to follow</h4>
        <FollowbarUsers />
      </div>
    </div>
  );
};

export default Followbar;
