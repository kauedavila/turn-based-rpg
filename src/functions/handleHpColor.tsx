const handleHPColor = (healthPercentage: number) => {
  if (healthPercentage > 50) {
    return "green";
  } else if (healthPercentage > 25) {
    return "#f5c71a";
  } else {
    return "#eb244b";
  }
};

export default handleHPColor;
