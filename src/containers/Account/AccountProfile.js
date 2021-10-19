import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef } from "react";
import "styles/profile.scss";

const AccountProfile = ({
  user,
  handleFileChange,
  userImage,
  ...remianingProps
}) => {
  let userImageUrl = user && user.displayPic ? user.displayPic.url : "";
  if (userImage && userImage.url) {
    userImageUrl = userImage.url;
  }
  const fileUploader = useRef(null);

  return (
    <Box {...remianingProps}>
      <CardContent>
        <Box
          textAlign="center"
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 100,
              width: 100,
            }}
            className="user-profile"
            src={userImageUrl}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user.city && user.city}
            {user.country && user.country}
          </Typography>
          <Typography color="textSecondary" variant="body1"></Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions className="profilepiccontainer">
        <label htmlFor="profilePic">Upload Profile Pic</label>
        <TextField
          margin="normal"
          required
          fullWidth
          ref={fileUploader}
          inputProps={{
            accept: "image/*",
          }}
          type="file"
          onChange={(event) => handleFileChange(event)}
          className="hiddenfileinput"
          id="profilePic"
          name="profilePic"
        />
      </CardActions>
    </Box>
  );
};

export default AccountProfile;
