import photosReducer from "../features/photo/reducer"

const rootReducer = {
  fakeTest: () => [],
  photos: photosReducer,
};

export default rootReducer;
