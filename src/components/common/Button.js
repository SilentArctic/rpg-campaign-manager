import { createUseStyles } from "react-jss";
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
   button: {
      height: 30,
      background: ({ secondary }) => secondary ? 'transparent' : theme.blue,
      border: 'none',
      borderRadius: theme.borderRadius,
      padding: [[0, 10]],
      color: ({ secondary }) => secondary ? theme.blue : '#fff',
      fontSize: 14,
      cursor: 'pointer',
      '&:hover': {
         background: ({ secondary }) => secondary ? 'transparent' : theme.lightBlue,
         color: ({ secondary }) => secondary ? theme.lightBlue : '#fff',
      },
   },
}));

export default function Button(props) {
   const $ = useStyles(props);
   const { children, secondary, ...buttonProps } = props;
   return <button className={$.button} {...buttonProps}>{children}</button>;
}

Button.propTypes = {
   secondary: PropTypes.bool,
};

Button.defaultProps = {
   secondary: false,
};
