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
const CREATE_SESSION = 'CREATE_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';

const reducer = (state = initialState, { type, payload }) => {
   /* eslint-disable indent */
   switch (type) {
      case SET_CAMPAIGN:
         return { ...payload, changesMade: false };
      case UPDATE_CAMPAIGN:
         return { ...state, [payload.name]: payload.value, changesMade: true };
      case CREATE_SESSION:
         return { ...state, sessions: payload };
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

export const createSession = () => (dispatch, getState) => {
   const { sessions } = getState().campaign;
   const date = new Date();

   dispatch({
      type: CREATE_SESSION,
      payload: [{
         id: Math.floor(Math.random() * 10000),
         name: 'New session',
         description: '',
         creationDate: date,
         lastUpdated: date,
         notes: [],
         conclusionLocation: '',
         conclusionTime: '',
      }, ...sessions],
   });
};

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

function createIdChain(noteId) {
   let idChain = (noteId + '').split('.');
   for (let i = 0; i < idChain.length; i++) {
      if (i === 0) {
         idChain[i] = idChain[i] * 1;
      } else {
         idChain[i] = `${idChain[i - 1] || ''}.${idChain[i]}` * 1;
      }
   }

   return idChain;
}

export const updateSessionNotes = (sessionId, note, entry) => (dispatch, getState) => {
   const idChain = createIdChain(note.id);

   /* find session */
   const { sessions } = getState().campaign;
   const sessionIndex = sessions.findIndex(s => s.id === sessionId);
   const session = sessions[sessionIndex];

   /* update notes */
   const { notes } = session;
   (function updateNote(currentNotes, iteration = 0) {
      if (iteration === idChain.length - 1) {
         const index = currentNotes.findIndex(n => n.id === idChain[iteration] * 1);
         currentNotes[index].entry = entry;
         return;
      }

      const nextNotes = currentNotes.find(n => n.id === idChain[iteration]).children;
      updateNote(nextNotes, iteration + 1);
   })(notes);

   /* update session notes */
   session.notes = notes;

   /* update sessions*/
   const newSessions = [...sessions];
   newSessions.splice(sessionIndex, 1, session);

   dispatch({
      type: UPDATE_SESSION,
      payload: newSessions,
   });
};

export const createSessionNote = (sessionId, entry, noteIds = []) => (dispatch, getState) => {
   const newNote = {
      id: Math.floor(Math.random() * 10000),
      // isTitle: entry.split(' ')[0] === 'Title:',
      entry,
      children: [],
      time: new Date(),
   };

   /* find session */
   const { sessions } = getState().campaign;
   const sessionIndex = sessions.findIndex(s => s.id === sessionId);
   const session = sessions[sessionIndex];

   /* add note */
   const { notes } = session;
   if (noteIds.length === 0) {
      session.notes = [...notes, newNote];
   }

   /* update sessions */
   const newSessions = [...sessions];
   newSessions.splice(sessionIndex, 1, session);

   dispatch({
      type: UPDATE_SESSION,
      payload: newSessions,
   });
};

export default reducer;