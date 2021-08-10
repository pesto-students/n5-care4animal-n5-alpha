import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SearchCampagin from "./SearchCampaign";
import CampaignDetails from "./CampaignDetails";
import CreateCampaign from "./CreateCampaign";
import Profile from "./Profile";
import { PrivateRoute, PublicRoute } from "containers";

export const Routes = () => (
  <Switch>
    <PublicRoute path="/signin" exact component={SignIn} />
    <PublicRoute path="/signup" exact component={SignUp} />
    <PublicRoute path="/search" exact component={SearchCampagin} />
    <PublicRoute path="/details/:id?" exact component={CampaignDetails} />{" "}
    <PrivateRoute path="/profile/:id?" exact component={Profile} />
    <PrivateRoute
      path="/createcampaign/:causeid?"
      exact
      component={CreateCampaign}
    />
    <Route path="/" exact component={LandingPage} />
  </Switch>
);
