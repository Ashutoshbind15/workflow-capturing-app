"use client";

import { useEffect, useState } from "react";

const WorkflowPage = ({ params }) => {
  const [workflow, setWorkflow] = useState(null);

  console.log(workflow);

  useEffect(() => {
    fetch(`/api/workflows/${params.id}`)
      .then((res) => res.json())
      .then((data) => setWorkflow(data));
  }, [params.id]);

  return (
    <>
      <div>WorkflowPage {params.id} </div>
      {workflow && (
        <div>
          <h1>Workflow</h1>
          <p>User: {workflow.user}</p>
          <p>Shots:</p>
          <ul>
            {workflow.shots.map((shot) => (
              <li key={shot._id}>
                <img src={shot.url} alt={shot.title} />
                <p>{shot.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default WorkflowPage;
