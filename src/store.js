import { createStore, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import campaignsReducer from './redux/campaignsReducer';
import campaignReducer from './redux/campaignReducer';

const persistConfig = {
   key: 'root',
   whitelist: ['campaigns'],
   storage,
};

const reducers = combineReducers({
   campaigns: campaignsReducer,
   campaign: campaignReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = () => {
   const composition = compose(
      // applyMiddleware(),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   );
   const store = createStore(persistedReducer, composition);
   const persistor = persistStore(store);
   return { store, persistor };
};

export default store;
