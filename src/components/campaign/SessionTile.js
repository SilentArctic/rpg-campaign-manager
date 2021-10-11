import { createUseStyles } from "react-jss";
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
   session: {
      height: 200,
      width: 200,
      display: 'flex',
      border: [[1, 'solid', theme.grey]],
      borderRadius: theme.borderRadius,
      cursor: 'pointer',
   },

   session_new: {
      extend: 'session',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 60,
   },
}));

export default function SessionTile({ isNew, onClick, session }) {
   const $ = useStyles();
   const { name, id } = session;

   if (isNew) {
      return <div className={$.session_new}>+</div>
   }

   return (
      <div className={$.session} onClick={() => onClick(id)}>
         {name}
      </div>
   );
}

SessionTile.propTypes = {
   isNew: PropTypes.bool,
   onClick: PropTypes.func,
   session: PropTypes.object,
};

SessionTile.defaultProps = {
   isNew: false,
   onClick: () => {},
   session: {},
};
