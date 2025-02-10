import { ContactFormSchema } from '../contacts-validation-schema'
import { handleAddAddress } from '../contacts-addresses'
import { UseFormReturn } from 'react-hook-form'
import { ContactsOfficeDetails } from '../contacts-office-details'
import { usePlatformGet } from '../../../../hooks'
import {
  mockSourceModelPagedResult,
  mockContactCategories,
  mockNegotiatorModelPagedResult,
  mockOfficeModelPagedResult,
  mockContactModel,
} from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'
import { Mock } from 'vitest'

vi.mock('../../../../hooks', () => ({
  usePlatformGet: vi.fn(),
  usePlatformUpdate: vi.fn(() => [vi.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as Mock

const error = {
  message: 'Error',
}

describe('ContactsOfficeDetails', () => {
  it('should match a snapshot', () => {
    mockUsePlatformGet
      .mockReturnValue([mockSourceModelPagedResult])
      .mockReturnValue([mockContactCategories])
      .mockReturnValue([mockNegotiatorModelPagedResult])
      .mockReturnValue([mockOfficeModelPagedResult])

    const form = {
      register: vi.fn(() => ({})),
      getValues: vi.fn(() => 'MOCK_ID'),
      formState: {
        errors: {
          source: error,
          negotiatorIds: error,
          officeIds: error,
          categoryIds: error,
        },
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    expect(render(<ContactsOfficeDetails form={form} contact={mockContactModel} />).asFragment()).toMatchSnapshot()
  })
})

describe('handleAddAddress', () => {
  it('should submit a contact then navigate', () => {
    const setHasAsAddress = vi.fn()
    const hadAsAddress = true

    const curried = handleAddAddress(setHasAsAddress, hadAsAddress)

    curried()

    expect(setHasAsAddress).toHaveBeenCalledWith(false)
  })
})
