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
      width: '100%',
      marginLeft: -4, // offset padding
      padding: 3,
      border: [[1, 'solid', 'transparent']],
      borderRadius: theme.borderRadius,
      fontSize: 14,
      cursor: ({ readOnly }) => readOnly ? 'default' : 'text',
      '&:hover': {
         borderColor: ({ readOnly }) => readOnly ? 'transparent' : theme.grey,
      },
   },

   input: {
      width: '100%',
      marginLeft: -4,
      display: 'block',
   },
}));

export default function FlipInput(props) {
   const {
      value,
      onChange,
      onShiftEnter,
      onCtrlEnter,
      className,
      readOnly,
      defaultEditing,
      ...inputProps
   } = props;
   const $ = useStyles({ readOnly });
   const [inputValue, setInputValue] = useState('');
   const [editing, setEditing] = useState(false);
   const inputRef = useRef(null);

   useEffect(() => {
      if (defaultEditing) {
         handleEditing();
      }
   }, [defaultEditing, setEditing]);

   const handleEditing = useCallback(() => {
      if (readOnly) return;

      setInputValue(value);
      setEditing(true);
   }, [setInputValue, value, setEditing]);

   useEffect(() => {
      if (editing) {
         inputRef.current.focus();
      }
   }, [editing]);

   const saveInput = useCallback(() => {
      setEditing(false);
      setInputValue('')
      onChange({ target: { name: props.name, value: inputValue } });
   }, [setEditing, onChange, props.name, inputValue]);

   const handleShiftEnter = useCallback(() => {
      saveInput();
      onShiftEnter({ target: { name: props.name, value: inputValue } });
   }, [saveInput, onShiftEnter, props.name, inputValue]);

   const handleCtrlEnter = useCallback(() => {
      saveInput();
      onCtrlEnter({ target: { name: props.name, value: inputValue }});
   }, [saveInput, onCtrlEnter, props.name, inputValue]);

   const handleChange = useCallback(e => {
      setInputValue(e.target.value);
   }, [setInputValue]);

   useClickOutside(editing && inputRef, saveInput);

   if (!editing) {
      return <div className={`${$.display} ${className}`} onClick={handleEditing}>{value || inputProps.placeholder}</div>;
   }

   return (
      <Input
         ref={inputRef}
         value={inputValue}
         onChange={handleChange}
         handleEnter={saveInput}
         handleShiftEnter={handleShiftEnter}
         handleCtrlEnter={handleCtrlEnter}
         className={`${$.input} ${className}`}
         autoComplete="off"
         autoFocus={defaultEditing}
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
