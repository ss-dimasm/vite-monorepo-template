import type { ContactFormSchema } from '../validationSchema'
import { UseFormReturn } from 'react-hook-form'
import { ContactPersonal } from '../ContactPersonalDetails'
import { render } from '../../../../../scripts/tests'

const error = {
  message: 'Error',
}

describe('ContactPersonal', () => {
  it('should match a snapshot', () => {
    const form = {
      register: vi.fn(() => ({})),
      formState: {
        errors: {
          title: error,
          forname: error,
          surname: error,
          dateOfBirth: error,
        },
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    expect(render(<ContactPersonal form={form} />).asFragment()).toMatchSnapshot()
  })
})
