import type { ContactFormSchema } from '../validationSchema'
import { UseFormReturn } from 'react-hook-form'
import { ContactCommunications } from '../ContactCommunications'
import { render } from '../../../../../scripts/tests'

const error = {
  message: 'Error',
}

describe('ContactsComsDetails', () => {
  it('should match a snapshot', () => {
    const form = {
      register: vi.fn(() => ({})),
      formState: {
        errors: {
          email: error,
          mobilePhone: error,
          workPhone: error,
          homePhone: error,
          marketingConsent: error,
        },
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    expect(render(<ContactCommunications form={form} />)).toMatchSnapshot()
  })
})
