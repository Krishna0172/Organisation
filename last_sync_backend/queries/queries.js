
// const getAllUsersQuery = 'SELECT org_id, org_name, adslastsyncat, ... FROM public.organisation LIMIT 100';

const getUserByIdQuery = (org_id, org_name) => `
  SELECT org_id, org_name, adslastsyncat, ...
  FROM public.organisation
  WHERE ${org_id ? `org_id = ${org_id}` : ''} ${org_id && org_name ? 'OR' : ''} ${org_name ? `org_name ILIKE '%${org_name}%'` : ''};
`;

const checkOtherTableQuery = `
    SELECT
      o.orgid,
      o.channel,
      o.isdisabled,
      o.isdisconnected,
      o.updatedat,
      o.email_campaign_module,
      o.review_module,
      o.buybox_module,
      o.keyword_module,
      o.pricing_module,
      o.ppr_module,
      o.modularity,
      o.inventory_module,
      u.adslastsyncat,
      u.inventorylastsyncat,
      u.orderslastsyncat,
      u.paymentslastsyncat,
      u.returnslastsyncat
    FROM
      public.organisation AS u
    JOIN
      public."fs-organisations-channels-db" AS o ON o.orgid = u.org_id
    WHERE
      o.orgid = $1;`;

module.exports = {
  getUserByIdQuery,
  checkOtherTableQuery
  // getAllUsersQuery,
};
