import React from 'react';

export default function Button(props) {
   const { children, ...buttonProps } = props;
   return <button {...buttonProps}>{children}</button>;
}

Button.propTypes = {};

Button.defaultProps = {};
