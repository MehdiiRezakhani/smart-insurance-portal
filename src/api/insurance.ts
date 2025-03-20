import axios from 'axios';
import { InsuranceForm, Application } from '../types/insurance';

const api = axios.create({
  baseURL: 'https://assignment.devotel.io/api/insurance'
});

export const fetchFormStructure = async (): Promise<InsuranceForm[]> => {
  const response = await api.get('/forms');
  return response.data;
};

export const submitForm = async (data: any): Promise<void> => {
  console.log(data);
  const response = await api.post('/forms/submit', data);
  console.log(response);
};

export const fetchApplications = async (): Promise<{
  columns: string[];
  data: Application[];
}> => {
  const response = await api.get('/forms/submissions');
  return response.data;
};