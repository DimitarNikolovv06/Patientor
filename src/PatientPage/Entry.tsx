import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import HeartColor from "./HeartColor";

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div
      style={{ border: "2px solid #e0e0e0", margin: 15, padding: 10 }}
      className="entry"
    >
      <div>
        <span style={{ fontWeight: "bold", marginRight: 10 }}>
          {entry.date}
        </span>
        {entry.type === "Hospital" ? (
          <Icon name="hospital" size="big" />
        ) : entry.type === "HealthCheck" ? (
          <Icon name="heart" size="big" />
        ) : (
          <Icon name="doctor" size="big" />
        )}
        {entry.type === "OccupationalHealthcare" && (
          <span>Employer: {entry.employerName}</span>
        )}
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnose = diagnoses.find((d, i) => d.code === code);

            return (
              <li key={Math.round(Math.random() * 100)}>{diagnose?.name}</li>
            );
          })}
        </ul>
      </div>
      <p color="#e0e0e0">{entry.description}</p>
      {entry.type === "HealthCheck" && (
        <HeartColor rating={entry.healthCheckRating} />
      )}
    </div>
  );
};

export default EntryComponent;
