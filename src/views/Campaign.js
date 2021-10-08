import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCampaign } from '../redux/campaignReducer';

export default function Campaign() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const campaign = useSelector(state => state.campaigns.find(c => JSON.stringify(c.id) === id));

   // fetch and store current campaign
   useEffect(() => {
      if (id !== 'create') {
         dispatch(setCampaign(campaign));
      }
   }, [id]);

   return <div>{campaign.name}</div>;
};
