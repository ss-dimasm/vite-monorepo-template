import type { ContactFormSchema } from '../validationSchema'
import { ContactAddresses, handleAddAddress } from '../ContactAddresses'
import { UseFormReturn } from 'react-hook-form'
import { render } from '../../../../../scripts/tests'

const error = {
  message: 'Error',
}

describe('ContactAddresses', () => {
  it('should match a snapshot', () => {
    const form = {
      register: vi.fn(() => ({})),
      formState: {
        errors: {},
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    expect(render(<ContactAddresses form={form} />).asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with work and secondary addresses', async () => {
    const form = {
      register: vi.fn(() => ({})),
      formState: {
        errors: {
          primaryAddress: {
            buildingName: error,
            buildingNumber: error,
            line1: error,
            line2: error,
            line3: error,
            line4: error,
            postcode: error,
          },
          secondaryAddress: {
            buildingName: error,
            buildingNumber: error,
            line1: error,
            line2: error,
            line3: error,
            line4: error,
            postcode: error,
          },
          workAddress: {
            buildingName: error,
            buildingNumber: error,
            line1: error,
            line2: error,
            line3: error,
            line4: error,
            postcode: error,
          },
        },
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    const wrapper = render(<ContactAddresses form={form} />)

    const secondaryButton = (await wrapper.findByText('Add Secondary Address')) as HTMLElement
    const workButton = (await wrapper.findByText('Add Work Address')) as HTMLElement

    secondaryButton.click()
    workButton.click()

    expect(wrapper.asFragment()).toMatchSnapshot()
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
