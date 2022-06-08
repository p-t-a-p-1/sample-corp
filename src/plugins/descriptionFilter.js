import Vue from 'vue'

/**
 * HTMLタグからプレーンテキストを取得
 * -> 本文からdescriptionを生成
 */
const formatMetaDescription = (content) => {
  if (!content) {
    return ''
  }
  let result = content
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    .replace(/\r?\n/g, '')
  // 指定文字数にカット
  const isContentLong = result.length > 120
  result = result.substr(0, 120)
  if (isContentLong) {
    result += '…'
  }
  return result
}

Vue.filter('formatMetaDescription', formatMetaDescription)
