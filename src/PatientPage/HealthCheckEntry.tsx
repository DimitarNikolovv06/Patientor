import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";

interface Props {
  entry: Entry;
}

const HealthCheckEntry: React.FC<Props> = () => {
  return <div className="health-check-entry"></div>;
};

export default HealthCheckEntry;
