import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  progress: {
    backgroundColor: "rgba(22, 181, 191, 1)",
    width: (props) => props.progress,
    height: "10px",
    borderRadius: "10px 10px",
  },
});

export const ProgressBar = (props) => {
  const classes = useStyles(props);

  return (
    <div className="progress-container">
      <div className={classes.progress}></div>
    </div>
  );
};
