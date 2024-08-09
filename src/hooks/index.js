import { useQuery } from "@tanstack/react-query";

export const useTeam = (id) => {
  const { isPending, error, data, isLoading, isError } = useQuery({
    queryKey: ["team", `${id}`],
    queryFn: () => fetch(`/team/${id}`).then((res) => res.json()),
  });

  return {
    teamData: data,
    teamIsPending: isPending,
    teamError: error,
    teamIsLoading: isLoading,
    teamIsError: isError,
  };
};
