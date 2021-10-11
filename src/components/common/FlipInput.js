import React, {
   useState,
   useRef,
   useCallback,
   useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Input from './Input';
import useClickOutside from '../../utils/useClickOutside';

const useStyles = createUseStyles(theme => ({
   display: {
      marginLeft: -3, // offset padding
      padding: 3,
      border: [[1, 'solid', 'transparent']],
      borderRadius: theme.borderRadius,
      fontSize: 14,
      cursor: 'text',
      '&:hover': {
         border: `1px solid ${theme.grey}`,
      },
   },

   input: {
      marginLeft: -3,
   },
}));

export default function FlipInput(props) {
   const { value, onChange, className, ...inputProps } = props;
   const $ = useStyles();
   const [inputValue, setInputValue] = useState('');
   const [editing, setEditing] = useState(false);
   const inputRef = useRef(null);

   useEffect(() => {
      if (editing) {
         inputRef.current.focus();
      }
   }, [editing]);

   const handleEditing = useCallback(() => {
      setInputValue(value);
      setEditing(true);
   }, [setInputValue, value, setEditing]);

   const saveInput = useCallback(() => {
      setEditing(false);
      setInputValue('')
      onChange({ target: { name: props.name, value: inputValue } });
   }, [setEditing, onChange, props.name, inputValue]);

   const handleChange = useCallback(e => {
      setInputValue(e.target.value);
   }, [setInputValue]);

   useClickOutside(editing && inputRef, saveInput);

   if (!editing) {
      return <div className={$.display} onClick={handleEditing}>{value}</div>;
   }

   return (
      <Input
         ref={inputRef}
         value={inputValue}
         onChange={handleChange}
         handleEnter={saveInput}
         className={`${className} ${$.input}`}
         autoComplete="off"
         {...inputProps}
      />
   );
}

FlipInput.propTypes = {
   value: PropTypes.string,
   className: PropTypes.string,
   onChange: PropTypes.func,
};

FlipInput.defaultProps = {
   value: '',
   className: '',
   onChange: () => {},
};
