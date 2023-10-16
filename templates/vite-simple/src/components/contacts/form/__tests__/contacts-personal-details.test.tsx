import { ContactFormSchema } from '../contacts-validation-schema'
import { UseFormReturn } from 'react-hook-form'
import { ContactsPersonal } from '../contacts-personal-details'
import { render } from '../../../../scripts/tests'

const error = {
  message: 'Error',
}

describe('ContactsPersonal', () => {
  it('should match a snapshot', () => {
    const form = {
      register: jest.fn(() => ({})),
      formState: {
        errors: {
          title: error,
          forname: error,
          surname: error,
          dateOfBirth: error,
        },
      },
    } as unknown as UseFormReturn<ContactFormSchema, any>

    expect(render(<ContactsPersonal form={form} />)).toMatchSnapshot()
  })
})
