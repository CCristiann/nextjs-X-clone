import React from "react";

import FollowbarUsers from "./FollowbarUsers";

const Followbar = () => {
  return (
    <div className="paddings top-0 hidden h-screen w-fit lg:sticky lg:block">
      <h4 className="sticky top-0 z-20 rounded-t-xl bg-neutral-800 px-4 py-4 text-xl font-semibold text-white">
        Who to follow
      </h4>
      <div className="followbar-users_scrollbar relative h-fit max-h-full overflow-auto rounded-b-xl bg-neutral-800">
        <FollowbarUsers />
      </div>
    </div>
  );
};

export default Followbar;
