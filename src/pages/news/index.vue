<template>
  <div>
    <page-title label="NEWS" />
    <news-list :list="posts" />
  </div>
</template>

<script>
import HeaderMeta from '~/mixins/meta'
export default {
  name: 'NewsIndexPage',
  mixins: [HeaderMeta],
  // データをWPから取得し、ページコンポーネントへ直接セットする
  async asyncData ({ payload, $config, $axios }) {
    // WP REST APIのベースURL
    const baseUrl = $config.wpBaseUrl
    // お知らせの記事を10件取得するためのエンドポイント作成
    const newsUrl = baseUrl + 'posts?_embed&per_page=10&categories=2'

    // 記事を取得
    const posts = payload || await $axios.$get(newsUrl)
    // <template></template>で使えるようにする

    // posts: posts
    return {
      posts
    }
  },
  data () {
    return {
      meta: {
        title: 'お知らせのたいとる',
        description: 'aaa',
        ogUrl: ''
      }
    }
  }
}
</script>
