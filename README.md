# Vue 3 + Typescript + Vite

## husky
``` 
npx husky install
npx husky add .husky/commit-msg "node scripts/verifyCommit.js"
```


## eslint

```
npm install -D eslint typescript

npm install -D  eslint-plugin-vue @vue/eslint-config-typescript

npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx husky add .husky/pre-commit "npm run lint"

```

