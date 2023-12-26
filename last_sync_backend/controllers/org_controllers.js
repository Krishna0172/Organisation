const client = require('../config/connection');
const { getUserByIdQuery ,checkOtherTableQuery, counts} = require('../queries/queries');

const getOrg = async (req, res) => {
  try {
    let { sort, column_name, limit, page } = req.query;
    const sortOrder = sort === 'desc' ? 'DESC' : 'ASC';
    let sortCol = column_name ? column_name : 'org_id';
    limit = limit ? limit : 25;
    page = page ? page : 1

    const offset = (page - 1) * limit;
    // console.log(page )
    const query = `SELECT org_id, org_name, adslastsyncat, inventorylastsyncat, orderslastsyncat, paymentslastsyncat, returnslastsyncat, subscriptionenddate, CAST(ROUND(
      CASE
        WHEN subscriptionenddate < CURRENT_DATE THEN
          EXTRACT(EPOCH FROM (CURRENT_DATE - subscriptionenddate)) / (24 * 60 * 60)
        ELSE
          0
      END
    )
    AS INTEGER
  ) AS days_expired FROM public.organisation ORDER BY ${sortCol} ${sortOrder} LIMIT ${limit} OFFSET
  ${offset} ;`;

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


const get_org_detailBy_Id = async (req, res) => {

  try {
    const { id } = req.params;
    const otherTableResult = await client.query(checkOtherTableQuery, [id]);

    res.send(otherTableResult.rows[0] );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error...');
  }
};



const get_counts = async(req,res)=>{
  try {
    const {id} = req.params;
    const otherTableResult = await client.query(counts,[id]);
    res.send(otherTableResult.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error...');
  }
}



module.exports = {
  getOrg,
  getOrgById,
  get_org_detailBy_Id,
  get_counts
};
