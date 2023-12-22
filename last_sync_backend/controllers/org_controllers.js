const client = require('../config/connection');
const { getUserByIdQuery } = require('../queries/queries');

const getOrg = async (req, res) => {
  try {
    let { sort, column_name, limit } = req.query;

    const sortOrder = sort === 'desc' ? 'DESC' : 'ASC';
    let sortCol = column_name ? column_name : 'org_id';
    limit = limit ? limit : 500;

    const query = `
      SELECT org_id, org_name, adslastsyncat, inventorylastsyncat, orderslastsyncat, paymentslastsyncat, returnslastsyncat
      FROM public.organisation ORDER BY ${sortCol} ${sortOrder} LIMIT ${limit}`;

    const result = await client.query(query);
    res.send(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
};



const getOrgById = async (req, res) => {
  try {
    const { id } = req.params;
    const isOrgId = /^\d+$/.test(id);

    let getUserQuery;
    if (isOrgId) {
      getUserQuery = `
        SELECT org_id, org_name, adslastsyncat, inventorylastsyncat, orderslastsyncat, paymentslastsyncat, returnslastsyncat
        FROM public.organisation
        WHERE org_id = $1
      `;
    } else {
      getUserQuery = getUserByIdQuery(null, id);
    }

    const result = await client.query(getUserQuery, [id]);
    res.send(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error...');
  }
};




module.exports = {
  getOrg,
  getOrgById,
};
