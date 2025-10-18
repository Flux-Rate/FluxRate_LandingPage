export const isEmailValid = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isNonEmpty = (value: string) => value.trim().length > 0;

export type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  facilityType: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
