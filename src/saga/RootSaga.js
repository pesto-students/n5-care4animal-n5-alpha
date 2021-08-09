import { call, spawn, all } from "redux-saga/effects";
import watchUserAuthentication from "./AuthSaga";
import watchCampaignSaga from "./CampaignSaga";
import watchCategorySaga from "./CategorySaga";

export default function* rootSaga() {
  const sagas = [watchUserAuthentication, watchCategorySaga, watchCampaignSaga];
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
