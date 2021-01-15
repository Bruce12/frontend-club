# test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 需求整理
1. 数学公式前端提交html 代码，后端生成图片，前端在根据图片进行展示，否则样式在富文本框难以控制，而且在手机端进行公式转换会影响手机性能
2. “题干”、“答案解析”，如果为富文本形式，h5手机端做题页，和展示页面得重构，重新写页面，不然样式处理会很麻烦，后端需要进行新旧版本兼容，告诉前端应该展示那个版本页面
3. 数学公式，单独字段（字段文本可以使用占位符进行占位），细节讨论
4. 答题页面缓存，前端缓存微信 部分手机可能存在问题，并不靠谱，local
