/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : ''};
  const showWhenVisible = {display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div className='toggle-wrapper'>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{buttonLabel}</button>
      <div className='form-wrapper' style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Togglable;
