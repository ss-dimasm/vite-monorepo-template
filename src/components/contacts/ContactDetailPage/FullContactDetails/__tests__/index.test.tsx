import { Mock } from 'vitest'
import { FullContactDetails } from '..'
import { usePlatformGet } from '../../../../../hooks'
import {
  mockSourceModelPagedResult,
  mockContactCategories,
  mockNegotiatorModelPagedResult,
  mockOfficeModelPagedResult,
  mockContactModel,
} from '../../../../../scripts/stubs'
import { render } from '../../../../../scripts/tests'

vi.mock('../../../../../hooks', () => ({
  usePlatformGet: vi.fn(),
  usePlatformUpdate: vi.fn(() => [vi.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as Mock

describe('FullContactDetails', () => {
  it('should match a snapshot with data', () => {
    vi.mocked(mockUsePlatformGet)
      .mockReturnValue([mockSourceModelPagedResult])
      .mockReturnValue([mockContactCategories])
      .mockReturnValue([mockNegotiatorModelPagedResult])
      .mockReturnValue([mockOfficeModelPagedResult])

    expect(render(<FullContactDetails contact={mockContactModel} />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with no data', () => {
    expect(render(<FullContactDetails contact={null} />).asFragment()).toMatchSnapshot()
  })
})
