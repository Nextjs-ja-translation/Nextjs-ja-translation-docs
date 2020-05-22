import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'

import Footer from '../../components/footer'
import Screen from '../../components/screen'
import Page from '../../components/page'
import FeedbackContext from '../../components/feedback-context'

import Container from '../../components/container'
import SectionHeader from '../../components/section-header'

import Preview from '../../components/blog/preview'
import { components } from '../../components/blog/post-components'
import { ORG_NAME } from '../../lib/constants'

function importAll(r) {
  return r.keys().map(r)
}

const previewItems = importAll(
  require.context('../../blog', false, /\-preview\.mdx$/)
)

function dateSortDesc(a, b) {
  const date1 = new Date(a.meta.date)
  const date2 = new Date(b.meta.date)
  if (date1 > date2) return -1
  if (date1 < date2) return 1
  return 0
}

const Li = components.li

const getLi = path => ({ children }) => {
  if (!children?.props?.props) {
    return <Li>{children}</Li>
  }

  const { props } = children.props
  const { href } = props
  const isHash = href && href.startsWith('#')
  const element = React.cloneElement(children, {
    props: isHash ? { ...props, href: path + href } : props
  })

  return <Li>{element}</Li>
}

const items = previewItems
  .sort(dateSortDesc)
  .map(({ default: Component, meta }, index) => {
    const previewComponents = { ...components, li: getLi(meta.link) }

    return (
      <Preview key={meta.title} detail={index < 5} {...meta}>
        <Component components={previewComponents} />
      </Preview>
    )
  })

export default () => (
  <FeedbackContext.Provider value={{ label: 'next-blog' }}>
    <Page title="Blog | Next.js">
      <Screen offset={64 + 400}>
        <Container padding wide>
          <SectionHeader
            title="Blog"
            description={
              <span>
                The latest news about Next.js <br className="display-mobile" />
                from the {ORG_NAME} team
              </span>
            }
          />
          <SkipNavContent />
          {items}
        </Container>
      </Screen>
      <Footer />
    </Page>
  </FeedbackContext.Provider>
)
