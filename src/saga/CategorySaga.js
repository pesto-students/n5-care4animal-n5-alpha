import { put, all, call, takeLatest } from "redux-saga/effects";
import { requestCategories } from "services/categoryService";

import { categoryConstants } from "appconstants/actions";

const { LOAD_CATEGORY, CATEGORY_LOADED } = categoryConstants;

export function* getCategories() {
  const { data } = yield call(requestCategories);
  if (data && data.result) {
    yield all([put({ type: CATEGORY_LOADED, categories: data.result })]);
  }
}

export default function* watchCategorySaga() {
  yield takeLatest(LOAD_CATEGORY, getCategories);
}
