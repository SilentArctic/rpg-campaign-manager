import { Link } from 'react-router-dom';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
   header: {
      height: 30,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.grey}`,
      padding: [[0, 20]],
   },

   buttons: {
      display: 'flex',
   },
}));

export default function Header() {
   const $ = useStyles();

   return (
      <div className={$.header}>
         RPG Campaign Manager

         <section className={$.buttons}>
            <Link to="/">Home</Link>
         </section>
      </div>
   );
}
