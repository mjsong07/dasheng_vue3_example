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

@todo lint-staged 只校验暂存区
@todo pettier配合eslint优化代码格式，这里忽略

``` 
npm install -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```


