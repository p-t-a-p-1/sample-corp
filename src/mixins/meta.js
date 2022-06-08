/**
 * 動的ページのmeta周り調整
 * @use asyncDataで記事情報を取得したあと、以下のようにmetaを追加
 * @example
 *   return {
 *     meta: {
 *       title: '', // 記事タイトル
 *       description: '', // 本文（HTMLタグ含むもの）
 *       ogImage: '', // アイキャッチ画像あれば画像パス
 *       ogUrl: '', // 表示中のURL
 *       ogType: '', // ※ オプション：基本は設定しない
 *       twitterCard: '', // ※ オプション：基本は設定しない
 *     }
 *   }
 */

export default {
  head () {
    // 詳細文（HTMLタグ除去）
    const formatDescriptionText = this.meta.description
      ? this.$options.filters.formatMetaDescription(this.meta.description)
      : 'デフォルトのdescription'
    return {
      title:
        this.meta.title ??
        'ページタイトル',
      titleTemplate: this.meta.isTitleTemplate
        ? null
        : '%s｜Sample-Corp',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: formatDescriptionText
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: formatDescriptionText
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.meta.ogImage ?? 'https://placehold.jp/1200x630.png'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.meta.ogUrl ?? 'https://example.com/'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.meta.ogType ?? 'website'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: this.meta.twitterCard ?? 'summary'
        }
      ]
    }
  }
}
