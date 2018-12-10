import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

function LinkButton(props) {
  const { color, children, href } = props;
  return (
    <a
      href={href}
      className={classNames('button', color ? `button--${color}` : null)}
    >
      {children}
    </a>
  );
}

LinkButton.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

LinkButton.defaultProps = {
  color: null,
};

export default LinkButton;
