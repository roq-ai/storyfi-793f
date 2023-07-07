import * as yup from 'yup';

export const actionPlanValidationSchema = yup.object().shape({
  plan_details: yup.string().required(),
  organization_id: yup.string().nullable(),
});
