import { ContactsEditView } from '..'
import { usePlatformGet } from '../../../../hooks'
import {
  mockSourceModelPagedResult,
  mockContactCategories,
  mockNegotiatorModelPagedResult,
  mockOfficeModelPagedResult,
  mockContactModel,
} from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'

jest.mock('../../../../hooks', () => ({
  usePlatformGet: jest.fn(),
  usePlatformUpdate: jest.fn(() => [jest.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as jest.Mock

describe('ContactsEditView', () => {
  it('should match a snapshot with data', () => {
    mockUsePlatformGet
      .mockReturnValue([mockSourceModelPagedResult])
      .mockReturnValue([mockContactCategories])
      .mockReturnValue([mockNegotiatorModelPagedResult])
      .mockReturnValue([mockOfficeModelPagedResult])

    expect(render(<ContactsEditView contact={mockContactModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot with no data', () => {
    expect(render(<ContactsEditView contact={null} />)).toMatchSnapshot()
  })
})
