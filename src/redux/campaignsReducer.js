const initialState = [
   {
      name: 'Turtles',
      id: 1,
      creationDate: '01/01/2021',
      lastUpdated: '10/01/2021',
   },
];

const reducer = (state = initialState, { type, payload }) => {
   /* eslint-disable indent */
   switch (type) {
      default:
         return state;
   }
   /* eslint-enable indent */
};

export default reducer;
