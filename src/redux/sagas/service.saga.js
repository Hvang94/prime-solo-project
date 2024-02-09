import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchServices() {
  try {
    const response = yield axios.get("/api/kalea");
    yield put({ type: "SET_SERVICES", payload: response.data });
  } catch (error) {
    console.log("GET services error", error);
  }
}

function* fetchClient() {
    try {
        const response = yield axios.get("/api/client");
        yield put({ type: "SET_CLIENT", payload: response.data });
    } catch (error) {
        console.log("GET client error", error);
    }
}

function* postClient() {
    try {
        const response = yield axios.post("/api/client");
        yield put({ type: "FETCH_CLIENT", payload: response.data });
    } catch (error) {
        console.log("POST client service error", error);
    }
}

function* serviceSaga() {
    yield takeLatest("FETCH_SERVICES", fetchServices);
    yield takeLatest("FETCH_CLIENT", fetchClient);
    yield takeLatest("POST_CLIENT", postClient);
}

export default serviceSaga;