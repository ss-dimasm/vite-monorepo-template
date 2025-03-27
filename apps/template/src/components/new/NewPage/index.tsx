import { FlexContainer, PageContainer, PageHeader, TextBase, Tile } from '@reapit/elements'
import { ErrorBoundary } from '../../../utils/error-boundary'

export const NewPage = () => {
  return (
    <FlexContainer isFlexAuto>
      <PageContainer hasGreyBackground>
        <ErrorBoundary>
          <PageHeader
            hasMaxWidth
            pageTitle={{
              children: 'New Page',
              hasBoldText: true,
            }}
            pageSubtitle={{
              children: 'This is a new page - add your content here',
            }}
          />
          <FlexContainer hasMaxWidth isFlexColumn>
            <Tile>
              <TextBase>Some body content here</TextBase>
            </Tile>
          </FlexContainer>
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}

export default NewPage
