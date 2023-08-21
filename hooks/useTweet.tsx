import fetcher from "@/libs/fetcher";

import useSWR from "swr";

const useTweet = (tweetId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/tweets/${tweetId}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useTweet;
