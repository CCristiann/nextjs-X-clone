import React from "react";

import FollowbarUsers from "./FollowbarUsers";

const Followbar = () => {
  return (
    <div className="hidden lg:sticky w-fit top-0 lg:block paddings h-screen">
      <h4 className="z-20 sticky top-0 px-4 py-4 rounded-t-xl bg-neutral-800 text-white font-semibold text-xl">Who to follow</h4>
      <div className="followbar-users_scrollbar relative max-h-full h-fit bg-neutral-800 rounded-b-xl overflow-auto">
        <FollowbarUsers />
      </div>
    </div>
  );
};

export default Followbar;
