import Typography from "@material-ui/core/Typography";
import "styles/SectionHeader.scss";

export const SectionHeader = ({ data = {} }) => {
  const allKeys = Object.keys(data);
  return (
    <>
      {allKeys.map((key, index) => (
        <Typography variant={key} key={key + index} className={"margin-bottom"}>
          {data[key]}
        </Typography>
      ))}
    </>
  );
};
