export const invokeLanguages = ["TypeScript", "Python", "Rust"] as const;

type InvokeLanguageTuple = typeof invokeLanguages;

export type InvokeLanguage = InvokeLanguageTuple[number];

export function isInvokeLanguage(language: string): language is InvokeLanguage {
  return invokeLanguages.includes(language as InvokeLanguage);
}
