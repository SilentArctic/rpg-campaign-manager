import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
   input: {
      border: [[1, 'solid', theme.grey]],
      borderRadius: theme.borderRadius,
      padding: 3,
      fontSize: 14,
   },
}));

const Input = React.forwardRef((props, ref) => {
   const {
      className,
      handleEnter,
      handleShiftEnter,
      handleCtrlEnter,
      ...inputProps
   } = props;
   const $ = useStyles();

   const onEnter = useCallback(e => {
      if (e.key === 'Enter' && e.shiftKey) {
         handleShiftEnter(e);
      } else if (e.key === 'Enter' && e.ctrlKey) {
         handleCtrlEnter(e);
      } else if (e.key === 'Enter') {
         handleEnter(e);
      }
   }, [handleEnter]);

   return (
      <input
         ref={ref}
         className={`${$.input} ${className}`}
         onKeyDown={onEnter}
         {...inputProps}
      />
   );
});

Input.propTypes = {
   className: PropTypes.string,
   handleEnter: PropTypes.func,
};

Input.defaultProps = {
   className: '',
   handleEnter: () => {},
};

export default Input;
