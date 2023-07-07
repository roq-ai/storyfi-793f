const mapping: Record<string, string> = {
  'action-plans': 'action_plan',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
