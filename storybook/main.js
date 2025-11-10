module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  core: { builder: '@storybook/builder-vite' }
}