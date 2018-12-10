/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
// import { linkTo } from '@storybook/addon-links';
import { action, withActions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';


import Button from '../src/app/components/Button';


/*
storiesOf('Welcome', module).add(
  'to Storybook',
  () => <Welcome showApp={linkTo('Button')} />,
);
*/

storiesOf('Button', module)
  .addDecorator(withActions('mouseover', 'click'))
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
