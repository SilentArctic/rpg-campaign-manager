import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
   sessionPanel: {},
}));

export default function SessionPanel({ sessionId }) {
   const $ = useStyles();
   const session = useSelector(state => state.campaign.sessions.find(s => s.id === sessionId));

   return (
      <div className={$.sessionPanel}>
         {session.name}
      </div>
   );
}

SessionPanel.propTypes = {
   sessionId: PropTypes.number.isRequired,
};
