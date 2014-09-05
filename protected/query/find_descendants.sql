WITH RECURSIVE nodes(
     inside_parent_id,
     outside_parent_id,
     child_id,
     child_name,
     path) AS (
	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
    p.name,
		ARRAY[r."inside_parent_id"]
	FROM "hierarchy_union" AS r, person AS p
	WHERE r."inside_parent_id" = :root_id
  AND r."child_id" = p.id

	UNION ALL

	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
    p.name,
		path || r."inside_parent_id"
	FROM "hierarchy_union" AS r, nodes AS nd, person AS p
	WHERE r."inside_parent_id" = nd.child_id
  AND r."child_id" = p.id
)
-- now change the naming convention to camelCase before return
SELECT
        child_id as id,
        child_name as name,
        inside_parent_id,
        outside_parent_id,
        "path" AS "path"
FROM nodes;
