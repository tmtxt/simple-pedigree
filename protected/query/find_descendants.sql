WITH RECURSIVE nodes(
     inside_parent_id,
     outside_parent_id,
     child_id,
     path) AS (
	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
		ARRAY[r."inside_parent_id"]
	FROM "hierarchy_union" AS r
	WHERE r."inside_parent_id" = 1
	UNION ALL
	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
		path || r."inside_parent_id"
	FROM "hierarchy_union" AS r, nodes AS nd
	WHERE r."inside_parent_id" = nd.child_id
)
-- now change the naming convention to camelCase before return
SELECT
        inside_parent_id,
        outside_parent_id,
        child_id,
        "path" AS "path"
FROM nodes;
