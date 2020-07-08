export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export const THEME_LIST = [
  {
    name: 'Default',
    style: {
      'body': {
        'color': '#000',
        'background': '#fff'
      }
    }
  },
  {
    name: 'eye',
    style: {
      'body': {
        'color': '#000',
        'background': '#ceeaba'
      }
    }
  },
  {
    name: 'night',
    style: {
      'body': {
        'color': '#fff',
        'background': '#000'
      }
    }
  },
  {
    name: 'gold',
    style: {
      'body': {
        'color': '#fff',
        'background': 'rgb(241, 236, 226)'
      }
    }
  }
]
export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background': '#cecece',
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6',
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9',
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000',
        }
      }
    }
  ]
}

export function setGlobalCss(href) {
  let link = document.querySelector('#globalThemeStyle')
  if (link) {
    link.href = href
  } else {
    link = document.createElement('link')
    link.id = 'globalThemeStyle'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    document.head.appendChild(link)
  }
}
export function removeCss(href) {
  let links = document.querySelectorAll('link')
  for(let i = links.length; i >= 0; i --) {
    const link = links[i]
    if (link && link.href && link.href === href) {
      link.parentNode.removeChild(link)
      return
    }
  }
}