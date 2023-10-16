import { ContactFormSchema } from '../contacts-validation-schema'
import { UseFormReturn } from 'react-hook-form'
import { ContactsComsDetails } from '../contacts-coms-details'
import { render } from '../../../../scripts/tests'

const error = {
  message: 'Error',
}

describe('ContactsComsDetails', () => {
  it('should match a snapshot', () => {
    const form = {
      register: jest.fn(() => ({})),
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

    expect(render(<ContactsComsDetails form={form} />)).toMatchSnapshot()
  })
})
