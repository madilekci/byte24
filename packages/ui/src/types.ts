

export enum TemplateType {
  PRIVACY_POLICY = "privacy-policy",
  TERMS_AND_CONDITIONS = "terms-and-conditions",
}

export interface IOption {
  id: number | string;
  name: string;
  description?: string;
  meta?: any;
}