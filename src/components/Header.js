import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
   header: {
      height: 30,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.grey}`,
      padding: [[0, 20]],
   },
}));

export default function Header() {
   const $ = useStyles();

   return (
      <div className={$.header}>
         RPG Campaign Manager
      </div>
   );
}
