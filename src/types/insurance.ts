export interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
  dependsOn?: {
    field: string;
    value: string | boolean;
  };
}

export interface InsuranceForm {
  formId: string;
  title: string;
  fields: FormField[];
}

export interface Application {
  id: string;
  fullName: string;
  age: number;
  insuranceType: string;
  city: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  [key: string]: any;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
}