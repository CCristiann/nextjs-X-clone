"use client";

import fetcher from "@/libs/fetcher";
import React from "react";
import useSWR from "swr";

const useTweets = (userId?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    userId ? `/api/tweets/user/${userId}` : "/api/tweets",
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useTweets;
