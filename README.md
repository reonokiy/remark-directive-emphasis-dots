# remark-directive-emphasis-dots

这是一个为 Markdown 中文行内文本添加着重号的[remark]()插件

## 安装

```sh
npm install remark-directive-emphasis-dots
```

## 用例

```js
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import remarkDirectiveEmphasisDots from 'remark-directive-emphasis-dots'

const text = ":emd[你好]，世界！"
const file = unified()
          .use(remarkParse)
          .use(remarkDirective)
          .use(remarkDirectiveEmphasisDots())
          .use(remarkRehype)
          .use(rehypeFormat)
          .use(rehypeStringify)
          .process(text)

console.log((await file).toString())
```
这会产生如下输出：

```
<p><em class="emd">你好</em>，世界！</p>
```

之后，你可以通过自定义CSS来为最终的显示效果添加着重号效果，例如

```css
em.emd {
 	font-style: normal;
	text-emphasis: filled black;
  text-emphasis-position: under right;
}
```

### 自定义选项

可以通过向函数中传入配置来更改行为，配置的格式如下

```
...
.use(remarkDirectiveEmphasisDots{
  tag: 'emd', /* markdown 中的标记名 */
  hName: 'em', /* HTML 中的标签名 */
  classNames: ["emd"] /* 为 HTML 标签添加的类 */
})
...
```
