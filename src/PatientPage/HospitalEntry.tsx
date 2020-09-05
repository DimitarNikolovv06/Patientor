import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";

interface Props {
  entry: Entry;
}

const HospitalEntry: React.FC<Props> = () => {
  return <div className="hospital-entry"></div>;
};

export default HospitalEntry;
