const initialState = [
   {
      id: 1,
      name: 'Turtles',
      description: 'This is a demo campaign for dev testing.',
      sessions: [
         {
            id: 1,
            name: 'Session 1',
            creationDate: '01/01/2021',
            lastUpdated: '01/01/2021',
            notes: [],
            description: '',
         },
      ],
      creationDate: '01/01/2021',
      lastUpdated: '10/01/2021',
      schedule: {
         day: 'Tuesdays',
         frequencies: 'weekly',
         date: '',
      },
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
