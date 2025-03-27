import { useEffect } from 'react'
import type { ChangeEvent } from 'react'
import {
  Button,
  ButtonGroup,
  elMb7,
  Loader,
  PageContainer,
  PersistentNotification,
  PageHeader,
  FlexContainer,
  Tile,
} from '@reapit/elements'
import { useForm, UseFormReset, UseFormTrigger } from 'react-hook-form'
import { ContactModel, UpdateContactModel } from '@reapit/foundations-ts-definitions'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigateFunction, Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
import { type ContactFormSchema, contactsValidationSchema } from '../common/ContactForm/validationSchema'
import { ContactPersonal } from '../common/ContactForm/ContactPersonalDetails'
import { ContactCommunications } from '../common/ContactForm/ContactCommunications'
import { ContactAddresses } from '../common/ContactForm/ContactAddresses'
import { ContactOfficeDetails } from '../common/ContactForm/ContactOfficeDetails'
import { FullContactDetails } from './FullContactDetails'
import { nonNullableObject } from '../../../utils/object'
import { UpdateFunction, usePlatformGet, usePlatformUpdate } from '../../../hooks'
import { combineName } from '../../../utils/combine-name'
import { ErrorBoundary } from '../../../utils/error-boundary'
import { navigateRoute } from '../../../utils/navigate'
import { buildContactListPageURL } from '../buildContactListPageURL'
import { buildCreateContactPageURL } from '../buildCreateContactPageURL'
import { buildContactDetailPageURL, type BuildContactDetailPageURLInput } from '../buildContactDetailPageURL'

export const handleChangeTab =
  (trigger: UseFormTrigger<ContactFormSchema>, navigate: NavigateFunction, contactId?: string) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const validateStep = async () => {
      const tab = event.target.value
      const { pathname } = window.location

      if (pathname.includes('personal')) {
        await trigger(['title', 'dateOfBirth', 'forename', 'surname'])
      }

      if (pathname.includes('communications')) {
        await trigger([
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
      }

      if (pathname.includes('addresses')) {
        await trigger(['primaryAddress', 'secondaryAddress', 'workAddress'])
      }

      if (pathname.includes('office')) {
        await trigger(['negotiatorIds', 'categoryIds', 'officeIds', 'source'])
      }

      if (contactId) {
        navigate(buildContactDetailPageURL({ contactId, tab: tab as BuildContactDetailPageURLInput['tab'] }))
      }
    }
    validateStep()
  }

export const handleSubmitContact =
  (updateContact: UpdateFunction<UpdateContactModel, boolean>, navigate: NavigateFunction) =>
  async (values: ContactFormSchema) => {
    const { source, categoryIds, negotiatorIds, officeIds, metaData } = values

    const updateContactParams: UpdateContactModel = {
      ...values,
      metadata: String(metaData) === String({}) ? undefined : metaData,
      categoryIds: categoryIds?.split(',').filter(Boolean),
      negotiatorIds: negotiatorIds?.split(',').filter(Boolean),
      officeIds: officeIds?.split(',').filter(Boolean),
      source: {
        id: source?.split('-')[0],
        type: source?.split('-')[1],
      },
    }

    const result = await updateContact(updateContactParams)

    if (result) {
      navigate(buildContactListPageURL())
    }
  }

export const handleResetForm = (contact: ContactModel | null, reset: UseFormReset<ContactFormSchema>) => () => {
  if (contact) {
    const santisedContact = nonNullableObject<ContactModel, ContactFormSchema>(contact)
    const primaryAddress = nonNullableObject<ContactModel['primaryAddress'], ContactFormSchema['primaryAddress']>(
      santisedContact?.primaryAddress,
    )
    const secondaryAddress = nonNullableObject<ContactModel['secondaryAddress'], ContactFormSchema['secondaryAddress']>(
      santisedContact?.primaryAddress,
    )
    const workAddress = nonNullableObject<ContactModel['workAddress'], ContactFormSchema['workAddress']>(
      santisedContact?.primaryAddress,
    )

    reset({
      ...santisedContact,
      primaryAddress,
      secondaryAddress,
      workAddress,
      source: contact?.source ? `${contact.source.id}-${contact.source.type}` : '',
      categoryIds: contact?.categoryIds?.join(','),
      negotiatorIds: contact?.negotiatorIds?.join(','),
      officeIds: contact?.officeIds?.join(','),
    })
  }
}

export const ContactDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { contactId } = useParams<'contactId'>()
  const { pathname } = location

  const [contact, contactLoading] = usePlatformGet<ContactModel>({
    path: `/contacts/${contactId}`,
    fetchWhenTrue: [contactId],
    queryParams: {
      embed: ['offices', 'negotiators', 'source'],
    },
  })

  const [updateContact, updateContactLoading] = usePlatformUpdate<UpdateContactModel, boolean>({
    path: `/contacts/${contactId}`,
    method: 'PATCH',
    headers: {
      'if-match': contact?._eTag ?? '',
    },
    successMessage: 'Contact updated successfully',
  })

  const form = useForm<ContactFormSchema>({
    resolver: yupResolver(contactsValidationSchema),
  })

  const {
    handleSubmit,
    trigger,
    reset,
    formState: { isValid, isValidating },
  } = form
  const { title, forename, surname } = contact ?? {}
  const name = combineName(title, forename, surname)

  useEffect(handleResetForm(contact, reset), [contact])

  return (
    <FlexContainer isFlexAuto>
      <PageContainer hasGreyBackground>
        <ErrorBoundary>
          <PageHeader
            hasMaxWidth
            pageTitle={{
              children: name,
              hasBoldText: true,
            }}
            buttons={[
              {
                children: 'Back To List',
                intent: 'default',
                onClick: navigateRoute(navigate, buildContactListPageURL()),
              },
              {
                children: 'New Contact',
                intent: 'primary',
                onClick: navigateRoute(navigate, buildCreateContactPageURL()),
              },
            ]}
            tabs={{
              hasNoBorder: true,
              name: 'app-edit-tabs',
              onChange: handleChangeTab(trigger, navigate, contactId),
              options: [
                {
                  id: 'overview',
                  value: 'overview',
                  text: 'Overview',
                  isChecked: pathname.includes('overview'),
                },
                {
                  id: 'personal',
                  value: 'personal',
                  text: 'Personal',
                  isChecked: pathname.includes('personal'),
                },
                {
                  id: 'communications',
                  value: 'communications',
                  text: 'Communications',
                  isChecked: pathname.includes('communications'),
                },
                {
                  id: 'addresses',
                  value: 'addresses',
                  text: 'Addresses',
                  isChecked: pathname.includes('addresses'),
                },
                {
                  id: 'office',
                  value: 'office',
                  text: 'Office Details',
                  isChecked: pathname.includes('office'),
                },
              ],
            }}
          />
          <FlexContainer hasMaxWidth isFlexColumn>
            <Tile>
              {contactLoading && <Loader />}
              <form>
                <div className={elMb7}>
                  <Routes>
                    <Route path="overview" element={<FullContactDetails contact={contact} />} />
                    <Route path="personal" element={<ContactPersonal form={form} />} />
                    <Route path="communications" element={<ContactCommunications form={form} />} />
                    <Route path="addresses" element={<ContactAddresses form={form} />} />
                    <Route path="office" element={<ContactOfficeDetails form={form} contact={contact} />} />
                  </Routes>
                </div>
                {!isValid && !isValidating && !pathname.includes('view') && contact && (
                  <PersistentNotification className={elMb7} isExpanded isFullWidth isInline intent="danger">
                    There are one or more errors in the form that are preventing you from saving the contact. Please
                    check each section to proceeed.
                  </PersistentNotification>
                )}
                {!pathname.includes('view') && (
                  <ButtonGroup alignment="left">
                    <Button
                      intent="primary"
                      onClick={handleSubmit(handleSubmitContact(updateContact, navigate))}
                      type="button"
                      disabled={updateContactLoading || !isValid}
                      loading={updateContactLoading}
                    >
                      Update
                    </Button>
                  </ButtonGroup>
                )}
              </form>
              {!contactLoading && !contact && (
                <PersistentNotification isExpanded isFullWidth isInline intent="primary">
                  Contact not found
                </PersistentNotification>
              )}
            </Tile>
          </FlexContainer>
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}
