import axios from 'axios';
import queryString from 'query-string';
import { ActionPlanInterface, ActionPlanGetQueryInterface } from 'interfaces/action-plan';
import { GetQueryInterface } from '../../interfaces';

export const getActionPlans = async (query?: ActionPlanGetQueryInterface) => {
  const response = await axios.get(`/api/action-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createActionPlan = async (actionPlan: ActionPlanInterface) => {
  const response = await axios.post('/api/action-plans', actionPlan);
  return response.data;
};

export const updateActionPlanById = async (id: string, actionPlan: ActionPlanInterface) => {
  const response = await axios.put(`/api/action-plans/${id}`, actionPlan);
  return response.data;
};

export const getActionPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/action-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteActionPlanById = async (id: string) => {
  const response = await axios.delete(`/api/action-plans/${id}`);
  return response.data;
};
