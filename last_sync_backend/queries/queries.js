// const getAllUsersQuery = 'SELECT org_id, org_name, adslastsyncat, ... FROM public.organisation LIMIT 100';

const getUserByIdQuery = (org_id, org_name) => `
  SELECT org_id, org_name, adslastsyncat, ...
  FROM public.organisation
  WHERE ${org_id ? `org_id = ${org_id}` : ""} ${
  org_id && org_name ? "OR" : ""
} ${org_name ? `org_name ILIKE '%${org_name}%'` : ""};
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

// With order_count as (select Count(*) as order_count from orders where orgid = 1),
// email_campaign as (select Count(*) as email_campaign_count from email_campaign where orgid = 1)

const counts = `WITH
order_count AS (SELECT COUNT(*) AS orders_count FROM orders WHERE orgid = $1),
email_campaign_count AS (SELECT COUNT(*) AS email_campaign_count FROM public."email-campaign" WHERE orgid = $1),
buybox_count AS (SELECT COUNT(*) AS buybox_count FROM public."fs-buybox-tracking" WHERE orgid = $1),
global_reviews_count AS (SELECT COUNT(*) AS global_reviews_count FROM public."fs-global-reviews-ratings-db" WHERE orgid = $1),
price_tracking_count AS (SELECT COUNT(*) AS price_tracking_count FROM public."fs-price-tracking" WHERE orgid = $1),
review_ratings_count AS (SELECT COUNT(*) AS review_ratings_count FROM public."fs-global-reviews-ratings-db" WHERE orgid = $1),
inventory_count AS (SELECT COUNT(*) AS inventory_count FROM inventory WHERE orgid = $1)

SELECT
$1 AS org_id,
(SELECT orders_count FROM order_count) AS orders_count,
(SELECT email_campaign_count FROM email_campaign_count) AS email_campaign_count,
(SELECT buybox_count FROM buybox_count) AS buybox_count,
(SELECT global_reviews_count FROM global_reviews_count) AS global_reviews_count,
(SELECT price_tracking_count FROM price_tracking_count) AS price_tracking_count,
(SELECT review_ratings_count FROM review_ratings_count) AS review_ratings_count,
(SELECT inventory_count FROM inventory_count) AS inventory_count;
`;

module.exports = {
  getUserByIdQuery,
  checkOtherTableQuery,
  counts,
};
