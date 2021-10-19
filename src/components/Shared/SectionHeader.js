import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "styles/SectionHeader.scss";

export const SectionHeader = ({ data = {} }) => {
  const allKeys = Object.keys(data);
  return (
    <Box textAlign="center">
      {allKeys.map((key, index) => (
        <Typography variant={key} key={key + index} className={"margin-bottom"}>
          {data[key]}
        </Typography>
      ))}
    </Box>
  );
};
