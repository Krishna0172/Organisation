
// const getAllUsersQuery = 'SELECT org_id, org_name, adslastsyncat, ... FROM public.organisation LIMIT 100';

const getUserByIdQuery = (org_id, org_name) => `
  SELECT org_id, org_name, adslastsyncat, ...
  FROM public.organisation
  WHERE ${org_id ? `org_id = ${org_id}` : ''} ${org_id && org_name ? 'OR' : ''} ${org_name ? `org_name ILIKE '%${org_name}%'` : ''};
`;

module.exports = {
  getUserByIdQuery,
  // getAllUsersQuery,
};
