import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

function LinkButton(props) {
  const {
    color, target, children, href,
  } = props;
  return (
    <a
      href={href}
      target={target}
      className={classNames('button', color ? `button--${color}` : null)}
    >
      {children}
    </a>
  );
}

LinkButton.propTypes = {
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LinkButton.defaultProps = {
  color: null,
  target: null,
};

export default LinkButton;
