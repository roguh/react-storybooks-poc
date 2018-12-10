/* eslint-disable import/no-extraneous-dependencies */
import { setAddon, addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { configureViewport, INITIAL_VIEWPORTS, withViewport } from '@storybook/addon-viewport';
import centered from '@storybook/addon-centered';
import { checkA11y } from '@storybook/addon-a11y';
import LiveEdit, { setOptions } from 'storybook-addon-react-live-edit';

// Should be the first decorator
addDecorator(withInfo);

// Global addon configuration
addDecorator(
  withOptions({
    name: 'AgileMD Styleguide',
  }),
);

configureViewport({
  viewports: INITIAL_VIEWPORTS,
});

addDecorator(withViewport('responsive'));

addDecorator(
  withBackgrounds([
    { name: 'default', value: '#fff', default: true },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ]),
);

addDecorator(centered);

addDecorator(checkA11y);

setOptions({ theme: 'darcula', presets: ['react'] });
setAddon(LiveEdit);

// automatically import all files ending in *.stories.js or .jsx
const req = require.context('../stories', true, /.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
