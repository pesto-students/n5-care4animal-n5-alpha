import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import PinterestIcon from "@material-ui/icons/Pinterest";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";

const ShareThis = (props) => {
  const shareBlockProps = {
    url: "https://upbeat-wilson-0d8b2a.netlify.app/",
    button: ShareButtonRectangle,
    buttons: [
      { network: "Twitter", icon: TwitterIcon },
      { network: "Facebook", icon: FacebookIcon },
      { network: "Email", icon: EmailIcon },
      { network: "Linkedin", icon: LinkedInIcon },
      {
        network: "Pinterest",
        icon: PinterestIcon,
        media:
          "https://raw.githubusercontent.com/greglobinski/react-custom-share/master/static/react-custom-share.gif",
      },
    ],
    text: "Be a kind, be humble and be a HERO.",
    longtext:
      "Animals have been scientifically proven to be therapeutic for people dealing with stress and depression. ... The positive effects of being around animals reduce negative emotions and help with the development of effective interactions. ",
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};

export default ShareThis;
