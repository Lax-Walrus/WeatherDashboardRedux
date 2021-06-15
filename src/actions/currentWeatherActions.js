import Axios from "axios";
import { CURRENT_WEATHER_REQUEST } from "../constants/currentWeatherConstant";

export const getCurrentWeather = (city) => async (dispatch, getState) => {
  dispatch({ type: CURRENT_WEATHER_REQUEST, payload: order });
};
