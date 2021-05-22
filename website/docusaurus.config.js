/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'NPlayer',
  tagline: 'video player',
  url: 'https://woopen.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'woopen', // Usually your GitHub org/user name.
  projectName: 'nplayer', // Usually your repo name.
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-CN': {
        label: '中文',
      }
    }
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    hideableSidebar: true,
    algolia: {
      apiKey: 'ba04a103ecb970278df9a94f32184c74',
      indexName: 'nplayer'
    },
    navbar: {
      title: 'NPlayer',
      hideOnScroll: true,
      logo: {
        alt: 'NPlayer',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          label: '文档',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'api/config',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/woopen/nplayer/issues/new/choose',
          label: '问题反馈',
          position: 'left'
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        alt: 'NPlayer',
        src: 'img/logo.svg',
        href: 'https://github.com/woopen/nplayer',
      },
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: 'docs/',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/nplayer',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/woopen/nplayer/issues',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/woopen/nplayer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" rel="noopener noreferrer" href="https://github.com/woopen">wopen</a>`,
    },
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/woopen/nplayer/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
