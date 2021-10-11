const initialState = {
   id: 0,
   name: '',
   description: '',
   sessions: [],
   creationDate: '',
   lastUpdated: '',
   schedule: {
      day: '',
      frequency: '',
      next: '',
   },
};

const SET_CAMPAIGN = 'SET_CAMPAIGN';
const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';

const reducer = (state = initialState, { type, payload }) => {
   /* eslint-disable indent */
   switch (type) {
      case SET_CAMPAIGN:
         return payload;
      case UPDATE_CAMPAIGN:
         return { ...state, [payload.name]: payload.value };

      default:
         return state;
   }
   /* eslint-enable indent */
};

export const setCampaign = campaign => ({
   type: SET_CAMPAIGN,
   payload: campaign,
});

export const updateCampaign = (name, value) => ({
   type: UPDATE_CAMPAIGN,
   payload: { name, value },
});

export default reducer;