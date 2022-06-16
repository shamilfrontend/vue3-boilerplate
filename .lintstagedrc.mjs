export default {
  '*.ts': ['eslint --fix', 'prettier --write'],
  '*.scss': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['stylelint --fix', 'eslint --fix', 'prettier --write'],
  // '*.{vue,ts}': [() => 'vue-tsc --noEmit --skipLibCheck'],
  '{*.json,.*rc}': ['prettier --write --parser json'],
  '*.{yaml,yml}': ['prettier --write --parser yaml']
};
