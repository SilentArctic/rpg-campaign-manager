const initialState = {};

const SET_CAMPAIGN = 'SET_CAMPAIGN';

const reducer = (state = initialState, { type, payload }) => {
   /* eslint-disable indent */
   switch (type) {
      case SET_CAMPAIGN:
         return payload;

      default:
         return state;
   }
   /* eslint-enable indent */
};

export const setCampaign = campaign => {
   return {
      type: SET_CAMPAIGN,
      payload: campaign,
   };
};

export default reducer;