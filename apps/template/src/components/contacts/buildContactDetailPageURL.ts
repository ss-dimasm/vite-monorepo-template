export interface BuildContactDetailPageURLInput {
  contactId: string
  /** @default 'overview' */
  tab?: 'overview' | 'personal' | 'communications' | 'addresses' | 'office'
}

export function buildContactDetailPageURL(input: BuildContactDetailPageURLInput) {
  return `/contacts/${input.contactId}/${input.tab ?? 'overview'}`
}
