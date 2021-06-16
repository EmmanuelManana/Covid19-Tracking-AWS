export const initialState = {
  mapCenter: {},
  countriesData: {},
  mapZoom: 0,
};

export const reducer = (state, action) => {
  console.log("payload:", action.payload);
  switch (action.type) {
    case "MAP_CENTER":
      return {
        ...state,
        mapCenter: action.payload,
      };
      case "MAP_ZOOM":
        return {
          ...state,
           mapZoom: action.payload
        }
    case "COUNTRIES_DATA":
      return {
        ...state,
        countriesData: action.payload,
      };
    default:
      return state;
  }
};
