WITH RECURSIVE nodes(
     inside_parent_id,
     outside_parent_id,
     child_id,
     child_name,
     child_picture,
     path) AS (
	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
    p.name,
    p.picture,
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
    p.picture,
		path || r."inside_parent_id"
	FROM "hierarchy_union" AS r, nodes AS nd, person AS p
	WHERE r."inside_parent_id" = nd.child_id
  AND r."child_id" = p.id
)
-- now change the naming convention to camelCase before return
SELECT
        child_id as id,
        child_name as name,
        child_picture as picture,
        inside_parent_id,
        outside_parent_id,
        array_to_string(path, ',') AS "path"
FROM nodes;
