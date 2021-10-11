import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { setCampaign, updateCampaign } from '../redux/campaignReducer';
import { FlipInput } from '../components/common';
import SessionTile from '../components/campaign/SessionTile';
import SessionPanel from '../components/campaign/SessionPanel';

const useStyles = createUseStyles(theme => ({
   campaign: {
      flexDirection: 'row',
   },

   list: {
      width: '100%',
      flexDirection: 'column',
   },

   header: {
      width: '100%',

      '& .name': {
         fontSize: 20,
         marginBottom: 6,
      },
      '& .description': {
         width: '100%',
      },
   },

   sessions: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 200px)',
      gap: 30,
      marginTop: 20,

      '& .session': {
         height: 200,
         width: 200,
         border: [[1, 'solid', theme.grey]],
      },
   },

   sessionPanels: {},
}));

export default function Campaign() {
   const $ = useStyles();
   const { id } = useParams();
   const dispatch = useDispatch();
   const campaignMatch = useSelector(state => state.campaigns.find(c => JSON.stringify(c.id) === id));
   const campaign = useSelector(state => state.campaign);
   const [openSessions, setOpenSessions] = useState([]);

   // fetch and store current campaign
   useEffect(() => {
      if (id !== 'create') {
         dispatch(setCampaign(campaignMatch));
      }
   }, [id]);

   const handleChange = useCallback(({ target: { name, value } }) => {
      dispatch(updateCampaign(name, value));
   }, [updateCampaign]);

   const handleSessionTile = useCallback(id => {
      const newSessions = [...openSessions, id];
      setOpenSessions(newSessions);
   }, [openSessions, setOpenSessions]);

   const sessions = campaign.sessions.map(session => (
      <SessionTile key={session.id} onClick={handleSessionTile} session={session} />
   ));

   const sessionPanels = openSessions.map(sessionId => (
      <SessionPanel key={sessionId} sessionId={sessionId} />
   ));

   return (
      <div className={`global-page ${$.campaign}`}>
         <section className={$.list}>
            <div className={$.header}>
               <div className="name">{campaign.name}</div>
               <FlipInput
                  name="description"
                  className="description"
                  placeholder="Campaign Description"
                  value={campaign.description}
                  onChange={handleChange}
               />
            </div>

            <div className={$.sessions}>
               <SessionTile isNew />
               {sessions}
            </div>
         </section>

         <section className={$.sessionPanels}>
            {sessionPanels}
         </section>
      </div>
   );
};
