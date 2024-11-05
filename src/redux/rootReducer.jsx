/*import { combineReducers } from "redux";
import { chatSlice } from "./reducers/chatSlice";

const rootReducer=combineReducers({
    chat:chatSlice,
});
export default rootReducer
*/

import { combineReducers } from "redux";
import chatReducer from "./reducers/chatSlice";

const rootReducer = combineReducers({
    chat: chatReducer,
});

export default rootReducer;
