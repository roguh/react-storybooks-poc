import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import '../../scss/_button.scss';

/** A generic Button component. */
function Button(props) {
  const { color, children } = props;
  return (
    <button
      type="button"
      className={classNames('button', color ? `button--${color}` : null)}
      style={{
        'background-color': color,
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /** Background color */
  color: PropTypes.string,
  /** Buttons must have children */
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  color: null,
};

export default Button;
