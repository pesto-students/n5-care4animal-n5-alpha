import { call, spawn, all } from "redux-saga/effects";
import watchUserAuthentication from "./AuthSaga";

export default function* rootSaga() {
  const sagas = [watchUserAuthentication];
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
