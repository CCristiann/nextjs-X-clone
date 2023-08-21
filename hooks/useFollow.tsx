import { useCallback, useMemo } from "react";

import useUser from "./useUser";

import axios from "axios";

const useFollow = (userId: string, currentUserId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } =
    useUser(currentUserId);
  const { mutate: mutateFetchedUser } = useUser(userId);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", {
            data: {
              userId,
              currentUserId,
            },
          });
      } else {
        request = () =>
          axios.post("/api/follow", {
            userId,
            currentUserId,
          });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
