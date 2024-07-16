export default {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --ext .js,.jsx,.ts,.tsx --report-unused-disable-directives --max-warnings 0',
    'prettier --write',
    'git add',
  ],
  '**/*.{html,css,json,yml,yaml,md}': ['prettier --write', 'git add'],
};
