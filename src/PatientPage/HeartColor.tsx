import React from "react";
import { HealthCheckRating } from "../types";
import { Icon } from "semantic-ui-react";

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
      return <p>kur</p>;
  }
};

export default HeartColor;
