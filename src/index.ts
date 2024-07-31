import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'
import type { Directives as DirectiveNode } from 'mdast-util-directive';

declare interface EmphasisOptions {
  tag: string
  hName: string
  classNames: string[]
}

export default function remarkDirectiveEmphasisDots(option: EmphasisOptions = {
  tag: 'emd',
  hName: 'em',
  classNames: ['emd']
}) {
  return () => {
    return (tree: DirectiveNode, file: VFile) => {
      visit(tree, function (node) {
        if (
          node.type === 'containerDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'textDirective'
        ) {

          if (node.name !== option.tag) return

          const data: any = node.data || (node.data = {})

          if (node.type === 'leafDirective' || node.type === 'containerDirective') {
            file.fail(
              `Unexpected "${node.type}" directive for tag "${option.tag}", expected "textDirective"`,
              node
            )
          }

          data.hName = option.hName
          data.hProperties = { className: option.classNames }
        }
      })
    }
  }
}
