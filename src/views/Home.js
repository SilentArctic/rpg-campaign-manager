import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   home: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   container: {
      width: '650px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
   },

   item: {
      height: 30,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: [[1, 'solid', theme.grey]],
      fontSize: 14,
      padding: [[0, 10]],
      cursor: 'pointer',
      '&:first-child': {
         borderTop: [[1, 'solid', theme.grey]],
      },
      '&:hover': {
         background: theme.lightGrey,
      },

      '& .date': {
         fontSize: 12,
      },
   },
}));

export default function Home() {
   const $ = useStyles();
   const campaigns = useSelector(state => state.campaigns);

   const campaignList = campaigns.map(campaign => (
      <Link key={campaign.id} to={`/campaign/${campaign.id}`} className={$.item}>
         <div>{campaign.name}</div>
         <div className="date">Created: {campaign.creationDate}</div>
         <div className="date">Updated: {campaign.lastUpdated}</div>
      </Link>
   ));

   return (
      <div className={`global-page ${$.home}`}>
         <div className={$.container}>
            <Link to="/campaign/create" className={$.item}>+ New Campaign</Link>
            {campaignList}
         </div>
      </div>
   );
}
