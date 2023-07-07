import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ActionPlanInterface {
  id?: string;
  plan_details: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ActionPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  plan_details?: string;
  organization_id?: string;
}
