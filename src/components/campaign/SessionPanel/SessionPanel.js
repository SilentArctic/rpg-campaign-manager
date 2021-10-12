import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { Button, FlipInput } from '../../common';
import Note from './Note';
import { createSessionNote, updateSession, updateSessionNotes } from '../../../redux/campaignReducer';

const useStyles = createUseStyles(theme => ({
   sessionPanel: {
      height: '100%',
      width: 500,
      borderLeft: [[1, 'solid', theme.grey]],
      position: 'relative',
      boxShadow: ({ preview }) => preview ? 'none' : [[-2, 2, 6, '#0004']],
   },

   header: {
      height: 60,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: [[1, 'solid', theme.grey]],
      padding: [[0, 20]],
      fontSize: 20,

      '& .name': {
         width: '50%',
         fontSize: 20,
      },
   },

   body: {
      width: '100%',
      padding: 20,
      overflowY: 'auto',

      '& .conclusion': {
         marginTop: 10,
         borderTop: [[1, 'solid', theme.grey]],
         paddingTop: 6,

         '& h1, & input': { marginBottom: 6 },
      },
   },

   footer: {
      height: 40,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderTop: [[1, 'solid', theme.grey]],
      padding: 10,
      position: 'absolute',
      bottom: 0,
   },
}));

export default function SessionPanel({ sessionId, preview, closePanel }) {
   const $ = useStyles({ preview });
   const dispatch = useDispatch();
   const [focusNewNote, setFocusNewNote] = useState(false);
   const [focusNoteDepth, setFocusNoteDepth] = useState(1);
   const changesMade = useSelector(state => state.campaign.changesMade);
   const session = useSelector(state => state.campaign.sessions.find(s => s.id === sessionId));

   const handleSessionChange = useCallback(({ target: { name, value } }) => {
      dispatch(updateSession(sessionId, name, value));
   });

   const handleEntry = useCallback((e, note) => {
      dispatch(updateSessionNotes(sessionId, note, e.target.value));
      setFocusNewNote(false);
   }, [dispatch, updateSessionNotes, sessionId]);

   const handleShiftEnter = useCallback((e, noteId) => {
      dispatch(createSessionNote(sessionId, '', noteId, 'sibling'));
      setFocusNewNote(true);
      setFocusNoteDepth(noteId.split('.').length);
   }, [dispatch, createSessionNote, sessionId]);

   const handleCtrlEnter = useCallback((e, noteId) => {
      dispatch(createSessionNote(sessionId, '', noteId, 'child'));
      setFocusNewNote(true);
      setFocusNoteDepth(noteId.split('.').length);
   }, [dispatch, createSessionNote, sessionId]);

   const renderNotes = (notes, topLevel) => notes.map((note, i) => (
      <Note
         key={note.id}
         note={note}
         hideTime={!topLevel}
         onChange={(e, targetNote) => handleEntry(e, targetNote)}
         onShiftEnter={handleShiftEnter}
         onCtrlEnter={handleCtrlEnter}
         preview={preview}
         isLast={i === notes.length - 1}
         focusNewNote={focusNewNote}
         focusNoteDepth={focusNoteDepth}
      />
   ));

   return (
      <div className={$.sessionPanel}>
         <header className={$.header}>
            <FlipInput
               name="name"
               className="name"
               value={session.name}
               onChange={handleSessionChange}
               placeholder="Session Name"
               readOnly={preview}
            />
            {preview
               ? <span onClick={closePanel}>X</span>
               : changesMade
                  ? <Button>Save</Button>
                  : <Button secondary onClick={closePanel}>Close</Button>
            }
         </header>

         <div className={$.body}>
            {renderNotes(session.notes, true)}
            {!preview && (
               <FlipInput
                  placeholder="+ New entry"
                  readOnly={preview}
                  onChange={e => dispatch(createSessionNote(sessionId, e.target.value))}
               />
            )}

            <section className="conclusion">
               <h1>Conclusion</h1>
               <FlipInput
                  name="conclusionLocation"
                  placeholder="Party location"
                  value={session.conclusionLocation}
                  onChange={handleSessionChange}
                  readOnly={preview}
               />
               <FlipInput
                  name="conclusionTime"
                  placeholder="Time of day"
                  value={session.conclusionTime}
                  onChange={handleSessionChange}
                  readOnly={preview}
               />
            </section>
         </div>

         <footer className={$.footer}>
            {!preview && <Button secondary>Help</Button>}
         </footer>
      </div>
   );
}

SessionPanel.propTypes = {
   sessionId: PropTypes.string.isRequired,
};
