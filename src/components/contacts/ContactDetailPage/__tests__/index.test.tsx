import { ChangeEvent } from 'react'
import { ContactDetailPage, handleChangeTab, handleResetForm, handleSubmitContact } from '..'
import type { ContactFormSchema } from '../../common/ContactForm/validationSchema'
import { usePlatformGet } from '../../../../hooks'
import { mockContactModel } from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'
import { Mock } from 'vitest'

vi.mock('../../../../hooks', () => ({
  usePlatformGet: vi.fn(),
  usePlatformUpdate: vi.fn(() => [vi.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as Mock

describe('ContactDetailPage', () => {
  it('should match a snapshot with data', () => {
    mockUsePlatformGet.mockReturnValue([mockContactModel, false])

    expect(render(<ContactDetailPage />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUsePlatformGet.mockReturnValue([null, true])

    expect(render(<ContactDetailPage />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when not loading but no contact', () => {
    mockUsePlatformGet.mockReturnValue([null, false])

    expect(render(<ContactDetailPage />).asFragment()).toMatchSnapshot()
  })
})

describe('handleChangeTab', () => {
  it('should validate the personal tab then navigate', async () => {
    window.location.pathname = '/personal'
    const trigger = vi.fn()
    const navigate = vi.fn()
    const contactId = 'FOO'
    const event = { target: { value: 'foo' } } as ChangeEvent<HTMLInputElement>

    const curried = handleChangeTab(trigger, navigate, contactId)

    curried(event)

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['title', 'dateOfBirth', 'forename', 'surname'])
    expect(navigate).toHaveBeenCalledWith('/contacts/FOO/foo')
  })

  it('should validate the communications tab then navigate', async () => {
    window.location.pathname = '/communications'
    const trigger = vi.fn()
    const navigate = vi.fn()
    const contactId = 'FOO'
    const event = { target: { value: 'foo' } } as ChangeEvent<HTMLInputElement>

    const curried = handleChangeTab(trigger, navigate, contactId)

    curried(event)

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith([
      'homePhone',
      'workPhone',
      'mobilePhone',
      'email',
      'marketingConsent',
      'communicationPreferenceEmail',
      'communicationPreferencePhone',
      'communicationPreferenceLetter',
      'communicationPreferenceSMS',
    ])

    expect(navigate).toHaveBeenCalledWith('/contacts/FOO/foo')
  })

  it('should validate the addresses tab then navigate', async () => {
    window.location.pathname = '/addresses'
    const trigger = vi.fn()
    const navigate = vi.fn()
    const contactId = 'FOO'
    const event = { target: { value: 'foo' } } as ChangeEvent<HTMLInputElement>

    const curried = handleChangeTab(trigger, navigate, contactId)

    curried(event)

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['primaryAddress', 'secondaryAddress', 'workAddress'])

    expect(navigate).toHaveBeenCalledWith('/contacts/FOO/foo')
  })

  it('should validate the office tab then navigate', async () => {
    window.location.pathname = '/office'
    const trigger = vi.fn()
    const navigate = vi.fn()
    const contactId = 'FOO'
    const event = { target: { value: 'foo' } } as ChangeEvent<HTMLInputElement>

    const curried = handleChangeTab(trigger, navigate, contactId)

    curried(event)

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['negotiatorIds', 'categoryIds', 'officeIds', 'source'])

    expect(navigate).toHaveBeenCalledWith('/contacts/FOO/foo')
  })
})

describe('handleSubmitContact', () => {
  it('should submit a contact then navigate', async () => {
    window.location.pathname = '/personal'
    const updateContact = vi.fn(() => Promise.resolve(true))
    const navigate = vi.fn()
    const values = {
      surname: 'MOCK_NAME',
      categoryIds: 'MOCK_CATEGORY',
      negotiatorIds: 'MOCK_NEG',
      officeIds: 'MOCK_OFFICE',
      source: 'MOCK-SOURCE',
    } as ContactFormSchema

    const curried = handleSubmitContact(updateContact, navigate)

    await curried(values)

    expect(updateContact).toHaveBeenCalledWith({
      ...values,
      categoryIds: ['MOCK_CATEGORY'],
      metadata: undefined,
      negotiatorIds: ['MOCK_NEG'],
      officeIds: ['MOCK_OFFICE'],
      source: {
        id: 'MOCK',
        type: 'SOURCE',
      },
    })
    expect(navigate).toHaveBeenCalledWith('/contacts')
  })
})

describe('handleResetForm', () => {
  it('should submit a contact then navigate', () => {
    window.location.pathname = '/personal'
    const reset = vi.fn()

    const curried = handleResetForm(mockContactModel, reset)

    curried()

    expect(reset).toHaveBeenCalledWith({
      ...mockContactModel,
      source: mockContactModel?.source ? `${mockContactModel.source.id}-${mockContactModel.source.type}` : '',
      categoryIds: mockContactModel?.categoryIds?.join(','),
      negotiatorIds: mockContactModel?.negotiatorIds?.join(','),
      officeIds: mockContactModel?.officeIds?.join(','),
    })
  })
})
