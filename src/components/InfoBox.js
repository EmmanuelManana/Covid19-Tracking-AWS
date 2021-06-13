import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import "../styles/InfoBox.css";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          <strong>{title?.toUpperCase()}</strong>
        </Typography>

        <h2 className="infoBox__cases">Today :{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
