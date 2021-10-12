import moment from 'moment';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { FlipInput } from '../../common';

const useStyles = createUseStyles(theme => ({
   note: {
      width: '100%',
   },

   parent: {
      width: '100%',
      display: 'flex',
   },

   time: {
      width: 55,
      minWidth: 55,
      maxWidth: 55,
      display: 'flex',
      alignItems: 'center',
      marginRight: 5,
      textAlign: 'right',
      fontSize: 12,
      color: theme.lightBlue,
      whiteSpace: 'nowrap',
   },

   children: {
      marginLeft: 80,
   },

   childNote: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',

      '& .bracket': {
         height: 6,
         width: 6,
         marginRight: 6,
         borderBottom: [[1, 'solid', 'black']],
         position: 'absolute',
         top: 6,
         left: -10,
      },
   },
}));

export default function Note({
   note,
   hideTime,
   onChange,
   onShiftEnter,
   onCtrlEnter,
   focusNewNote,
   focusNoteDepth,
   isLast,
   preview,
}) {
   const $ = useStyles();

   const handleShiftEnter = e => {
      onChange(e, note);
      onShiftEnter(e, note.id);
   };

   const handleCtrlEnter = (e) => {
      onChange(e, note);
      onCtrlEnter(e, note.id);
   };

   function renderChildren() {
      return note.children.map((childNote, i) => (
         <div key={childNote.id} className={$.childNote}>
            <span className="bracket" />
            <Note
               note={childNote}
               preview={preview}
               onChange={onChange}
               onShiftEnter={onShiftEnter}
               onCtrlEnter={onCtrlEnter}
               focusNewNote={focusNewNote}
               focusNoteDepth={focusNoteDepth}
               isLast={i === note.children.length - 1}
               hideTime
            />
         </div>
      ));
   }

   return (
      <div className={$.note}>
         <div className={$.parent}>
            {!hideTime && (
               <div className={$.time}>{moment(note.time).format('hh:mm a')}</div>
            )}
            <FlipInput
               key={note.id}
               value={note.entry}
               placeholder="New entry"
               onChange={e => onChange(e, note)}
               readOnly={preview}
               onShiftEnter={handleShiftEnter}
               onCtrlEnter={handleCtrlEnter}
               defaultEditing={focusNewNote && focusNoteDepth === note.id.split('.').length && isLast}
            />
         </div>
         {note.children.length > 0 && (
            <div className={$.children}>{renderChildren()}</div>
         )}
      </div>
   );
};

Note.propTypes = {
   note: PropTypes.object,
   hideTime: PropTypes.bool,
};

Note.defaultProps = {
   note: {},
   hideTime: false,
};
