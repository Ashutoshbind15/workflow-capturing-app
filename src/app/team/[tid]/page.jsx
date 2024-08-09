"use client";

import { useTeam } from "@/hooks";

const ChatTab = () => {
  <div>ChatTab</div>;
};

const WorkFlowsTab = () => {
  <div>WorkFlowsTab</div>;
};

const TeamTab = () => {
  <div>TeamTab</div>;
};

const SectionsTab = () => {
  <div>SectionsTab</div>;
};

const TeamPage = ({ params }) => {
  const { tid } = params;

  const { teamData, teamIsPending, teamError, teamIsLoading, teamIsError } =
    useTeam(tid);

  if (teamIsPending || teamIsLoading) {
    return <div>Loading...</div>;
  }

  return <div>TeamPage</div>;
};

export default TeamPage;
