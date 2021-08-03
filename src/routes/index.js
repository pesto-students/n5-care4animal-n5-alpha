import { Route, BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { SearchCampagin } from "./SearchCampaign";
import { CampaignDetails } from "./CampaignDetails";
import { CreateCampaign } from "./CreateCampaign";
import { Profile } from "./Profile";
export const Routes = () => (
  <Router>
    <Route path="/" exact component={LandingPage}></Route>
    <Route path="/signin" exact component={SignIn}></Route>
    <Route path="/signup" exact component={SignUp}></Route>
    <Route path="/search" exact component={SearchCampagin}></Route>
    <Route path="/details/:id" exact component={CampaignDetails}></Route>{" "}
    <Route path="/Profile/:id" exact component={Profile}></Route>
    <Route
      path="/createcampaign/:causeid?"
      exact
      component={CreateCampaign}
    ></Route>
  </Router>
);
