import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div
      style={{ border: "2px solid #e0e0e0", margin: 15, padding: 10 }}
      className="entry"
    >
      <div>
        <span style={{ fontWeight: "bold" }}>{entry.date}</span>
        <Icon name="doctor" size="big" />
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnose = diagnoses.find((d) => d.code === code);

            return <li key={diagnose?.code}>{diagnose?.name}</li>;
          })}
        </ul>
      </div>
      <p color="#e0e0e0">{entry.description}</p>
    </div>
  );
};

export default EntryComponent;
