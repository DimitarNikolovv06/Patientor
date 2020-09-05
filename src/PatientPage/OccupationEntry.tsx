import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";

interface Props {
  entry: Entry;
}

const OccupationEntry: React.FC<Props> = () => {
  return <div className="occupation-entry"></div>;
};

export default OccupationEntry;
