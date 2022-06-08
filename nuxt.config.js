import axios from 'axios'
export default {

  srcDir: './src',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sample-corp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'assets/scss/common.scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/dateFilter',
    '~/plugins/descriptionFilter'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Noto Sans JP': [400, 500, 700]
        }
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader'
  ],

  styleResources: {
    scss: ['assets/scss/_variables.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    wpBaseUrl: process.env.WP_BASE_URL
  },

  generate: {
    exclude: [
      '/contact'
    ],
    async routes () {
      return await axios.get(`${process.env.WP_BASE_URL}posts?_embed&categories=2`)
        .then((response) => {
          // 全お知らせ記事情報
          const newsData = response.data

          // お知らせ詳細ごとのルーティング、
          // そのルーティングに対する記事情報をオブジェクトとしてまとめる
          const newsRoutes = newsData.map((news) => {
            return {
              route: `/news/posts/${news.id}`,
              payload: news
            }
          })

          // トップページは最新3つ
          const topNewsData = newsData.slice(0, 3)

          // トップ・お知らせ一覧のルーティング、全お知らせ詳細のルーティングを配列化
          return [
            {
              route: '/',
              payload: topNewsData
            },
            {
              route: '/news',
              payload: newsData
            },
            ...newsRoutes
          ]
        })
    }
  }
}
