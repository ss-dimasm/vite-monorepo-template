import { ContactsNew, handleSwitchStep, handleSubmitContact } from '..'
import { render } from '../../../../scripts/tests'
import { ContactFormSchema } from '../../form/contacts-validation-schema'
import { CONTACTS_ROUTES } from '../../routes'

vi.mock('../../../../hooks', () => ({
  usePlatformGet: vi.fn(),
  usePlatformUpdate: vi.fn(() => [vi.fn()]),
}))

describe('ContactsNew', () => {
  it('should match a snapshot', () => {
    expect(render(<ContactsNew />).asFragment()).toMatchSnapshot()
  })
})

describe('handleSwitchStep', () => {
  it('should validate step 1', async () => {
    const step = '2'
    const selectedStep = '1'
    const trigger = vi.fn(() => Promise.resolve(true))
    const setSelectedStep = vi.fn()

    const curried = handleSwitchStep(step, selectedStep, trigger, setSelectedStep)

    curried()

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['title', 'dateOfBirth', 'forename', 'surname'])
    expect(setSelectedStep).toHaveBeenCalledWith(step)
  })

  it('should validate step 2', async () => {
    const step = '3'
    const selectedStep = '2'
    const trigger = vi.fn(() => Promise.resolve(true))
    const setSelectedStep = vi.fn()

    const curried = handleSwitchStep(step, selectedStep, trigger, setSelectedStep)

    curried()

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
    expect(setSelectedStep).toHaveBeenCalledWith(step)
  })

  it('should validate step 3', async () => {
    const step = '4'
    const selectedStep = '3'
    const trigger = vi.fn(() => Promise.resolve(true))
    const setSelectedStep = vi.fn()

    const curried = handleSwitchStep(step, selectedStep, trigger, setSelectedStep)

    curried()

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['primaryAddress', 'secondaryAddress', 'workAddress'])
    expect(setSelectedStep).toHaveBeenCalledWith(step)
  })

  it('should validate step 4', async () => {
    const step = '1'
    const selectedStep = '4'
    const trigger = vi.fn(() => Promise.resolve(true))
    const setSelectedStep = vi.fn()

    const curried = handleSwitchStep(step, selectedStep, trigger, setSelectedStep)

    curried()

    await Promise.resolve()

    expect(trigger).toHaveBeenCalledWith(['negotiatorIds', 'categoryIds', 'officeIds', 'source'])
    expect(setSelectedStep).toHaveBeenCalledWith(step)
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
      negotiatorIds: ['MOCK_NEG'],
      officeIds: ['MOCK_OFFICE'],
      source: {
        id: 'MOCK',
        type: 'SOURCE',
      },
    })
    expect(navigate).toHaveBeenCalledWith(CONTACTS_ROUTES.CONTACTS_LIST)
  })
})
