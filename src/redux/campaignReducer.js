const baseNote = {
   id: null,
   isTitle: false,
   time: '',
   entry: '',
   children: [], // list of notes
};

const initialState = {
   id: null,
   name: '',
   description: '',
   sessions: [
      {
         id: null,
         name: '',
         description: '',
         creationDate: '',
         lastUpdated: '',
         notes: [
            baseNote,
         ],
         conclusionLocation: '',
         conclusionTime: '',
      },
   ],
   creationDate: '',
   lastUpdated: '',
   schedule: {
      day: '',
      frequency: '',
      next: '',
   },
   changesMade: false,
};

const SET_CAMPAIGN = 'SET_CAMPAIGN';
const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
const UPDATE_SESSION = 'UPDATE_SESSION';

const reducer = (state = initialState, { type, payload }) => {
   /* eslint-disable indent */
   switch (type) {
      case SET_CAMPAIGN:
         return { ...payload, changesMade: false };
      case UPDATE_CAMPAIGN:
         return { ...state, [payload.name]: payload.value, changesMade: true };
      case UPDATE_SESSION:
         return { ...state, sessions: payload, changesMade: true };

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

export const updateSession = (sessionId, name, value) => (dispatch, getState) => {
   // find session
   const { sessions } = getState().campaign;
   const sessionIndex = sessions.findIndex(s => s.id === sessionId);
   const session = sessions[sessionIndex];

   // update session properties
   const newSession = { ...session, [name]: value };
   const newSessions = [...sessions];
   newSessions.splice(sessionIndex, 1, newSession);

   dispatch({
      type: UPDATE_SESSION,
      payload: newSessions,
   });
};

export const updateSessionNotes = (sessionId, note, entry) => (dispatch, getState) => {
   // find session
   const { sessions } = getState().campaign;
   const sessionIndex = sessions.findIndex(s => s.id === sessionId);
   const session = sessions[sessionIndex];

   // update notes
   const { notes } = session;
   const noteIndex = notes.findIndex(n => n.id === note.id);
   notes.splice(noteIndex, 1, { ...note, entry });

   // update session notes
   session.notes = notes;

   // update sessions
   const newSessions = [...sessions];
   newSessions.splice(sessionIndex, 1, session);

   dispatch({
      type: UPDATE_SESSION,
      payload: newSessions,
   });
};

export const createSessionNote = (sessionId, entry) => (dispatch, getState) => {
   if (!entry) return;

   // find session
   const { sessions } = getState().campaign;
   const sessionIndex = sessions.findIndex(s => s.id === sessionId);
   const session = sessions[sessionIndex];

   // add note
   const { notes } = session;
   session.notes = [...notes, {
      id: Math.floor(Math.random() * 10000),
      isTitle: entry.split(' ')[0] === 'Title:',
      entry,
      children: [],
      time: new Date(),
   }];

   // update sessions
   const newSessions = [...sessions];
   newSessions.splice(sessionIndex, 1, session);

   dispatch({
      type: UPDATE_SESSION,
      payload: newSessions,
   });
};

export default reducer;