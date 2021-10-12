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
            notes: [
               {
                  id: 1,
                  isTitle: false,
                  time: '01/01/2021 6:12 pm',
                  entry: 'First note! Looking good',
                  children: [
                     {
                        id: 1.1,
                        isTitle: false,
                        time: '01/01/01 5:14 pm',
                        entry: 'Note child',
                        children: [],
                     },
                     {
                        id: 1.2,
                        isTitle: false,
                        time: '01/01/01 5:14 pm',
                        entry: 'Note child 2',
                        children: [],
                     },
                  ],
               },
            ],
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
