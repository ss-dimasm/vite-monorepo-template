import { Mock } from 'vitest'
import {
  ContactListPage,
  handleOpenModal,
  handleToggleActiveContact,
  handleSetContactsFilters,
  handleOpenDrawer,
} from '..'
import { usePlatformGet } from '../../../../hooks'
import { mockContactModelPagedResult, mockContactModel } from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'

vi.mock('../../../../hooks', () => ({
  usePlatformGet: vi.fn(),
  usePlatformUpdate: vi.fn(() => [vi.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as Mock

describe('ContactListPage', () => {
  it('should match a snapshot with data', () => {
    mockUsePlatformGet.mockReturnValue([mockContactModelPagedResult, false])

    expect(render(<ContactListPage />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUsePlatformGet.mockReturnValue([null, true])

    expect(render(<ContactListPage />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when not loading but no contact', () => {
    mockUsePlatformGet.mockReturnValue([null, false])

    expect(render(<ContactListPage />).asFragment()).toMatchSnapshot()
  })
})

describe('handleOpenModal', () => {
  it('should correctly open the modal', () => {
    const openModal = vi.fn()
    const contact = mockContactModel
    const setContactToToggleActive = vi.fn()

    const curried = handleOpenModal(openModal, contact, setContactToToggleActive)

    curried()

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(setContactToToggleActive).toHaveBeenCalledWith(contact)
  })
})

describe('handleOpenDrawer', () => {
  it('should correctly open the modal', () => {
    const openDrawer = vi.fn()
    const contact = mockContactModel
    const setContactToQuickView = vi.fn()

    const curried = handleOpenDrawer(openDrawer, contact, setContactToQuickView)

    curried()

    expect(openDrawer).toHaveBeenCalledTimes(1)
    expect(setContactToQuickView).toHaveBeenCalledWith(contact)
  })
})

describe('handleToggleActiveContact', () => {
  it('should correctly deactivate the contact', async () => {
    const closeModal = vi.fn()
    const contactsRefresh = vi.fn()
    const toggleActiveContact = vi.fn(() => Promise.resolve(true))
    const setContactToToggleActive = vi.fn()

    const curried = handleToggleActiveContact(
      closeModal,
      contactsRefresh,
      toggleActiveContact,
      setContactToToggleActive,
      true,
    )

    await curried()

    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(contactsRefresh).toHaveBeenCalledTimes(1)
    expect(toggleActiveContact).toHaveBeenCalledWith({ active: false })
    expect(setContactToToggleActive).toHaveBeenCalledWith(null)
  })
})

describe('handleSetContactsFilters', () => {
  it('should subscribe to watch', () => {
    const setContactFilters = vi.fn()
    const watch = vi.fn()

    const curried = handleSetContactsFilters(setContactFilters, watch)

    curried()

    expect(watch).toHaveBeenCalledTimes(1)
  })
})
