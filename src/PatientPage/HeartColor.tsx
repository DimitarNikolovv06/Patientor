import React from "react";
import { HealthCheckRating } from "../types";
import { Icon } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HeartColor: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Icon name="heart" color="green" />;

    case HealthCheckRating.LowRisk:
      return <Icon name="heart" color="blue" />;

    case HealthCheckRating.HighRisk:
      return <Icon name="heart" color="orange" />;

    case HealthCheckRating.CriticalRisk:
      return <Icon name="heart" color="red" />;

    default:
      return assertNever(rating);
  }
};

export default HeartColor;
