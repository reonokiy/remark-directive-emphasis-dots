import { assert, expect, test } from 'vitest'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import plugin from './index'

const TAG = 'emdot'
const H_NAME = 'span'
const CLASS_NAMES = ['emdot', 'aaa']

async function pipeline(text: string) {
    const file = unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(plugin({ tag: TAG, hName: H_NAME, classNames: CLASS_NAMES }))
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(text)
    return (await file).toString()
}

test('text directive', async () => {
    expect(await pipeline(`:${TAG}[测试]`)).toBe(`\n<p><${H_NAME} class="${CLASS_NAMES.join(' ')}">测试</${H_NAME}></p>\n`)
})

test('leaf directive', async () => {
    try {
        await pipeline(`::${TAG}{测试}`)

    } catch (e) {
        assert(e.fatal, 'Expected error')
    }
})

test('container directive', async () => {
    try {
        await pipeline(`
:::${TAG}[测试]
    text
:::
        `)

    } catch (e) {
        assert(e.fatal, 'Expected error')
    }
})

test('unexpected directive', async () => {
    try {
        await pipeline(':tag[测试]')
    } catch (e) {
        assert(e.fatal, 'Expected error')
    }
})
