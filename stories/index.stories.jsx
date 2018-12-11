/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { action, withActions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Button from '../src/app/components/Button';
import LinkButton from '../src/app/components/LinkButton';


storiesOf('Button', module)
  .addDecorator(withActions('mouseover', 'click'))
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('see button-like anchors', () => <button onClick={linkTo('Anchor')}>Go</button>)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with icon', () => <Button onClick={action('clicked')}>✔</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Anchor', module)
  .addDecorator(withActions('mouseover', 'click'))
  .add(
    'button-like', () => <LinkButton target="_blank" href="#" className="button">Click</LinkButton>,
  );
