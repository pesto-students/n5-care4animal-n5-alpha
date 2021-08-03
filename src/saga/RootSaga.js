import { call, spawn, all } from "redux-saga/effects";

export default function* rootSaga() {
  // const sagas = [saga1, saga2, saga3];
  const sagas = [];
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
