WITH RECURSIVE nodes(
     inside_parent_id,
     outside_parent_id,
     child_id,
     child_name,
     child_picture,
     child_gender,
     child_marriage_ids,
     child_marriage_names,
     child_marriage_pictures,
     child_marriage_genders,
     path) AS (
	SELECT
		r."inside_parent_id",
		r."outside_parent_id",
		r."child_id",
    p.name,
    p.picture,
    p.gender,
    ARRAY(SELECT outside_person_id FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_name FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_picture FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_gender FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
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
    p.gender,
    ARRAY(SELECT outside_person_id FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_name FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_picture FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
    ARRAY(SELECT outside_person_gender FROM marriage_union WHERE inside_person_id = r.child_id ORDER BY inside_person_id, outside_person_id),
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
        child_gender AS gender,
        array_to_string(child_marriage_ids, ',') AS marriage_ids,
        array_to_string(child_marriage_names, ',') AS marriage_names,
        array_to_string(child_marriage_pictures, ',') AS marriage_pictures,
        array_to_string(child_marriage_genders, ',') AS marriage_genders,
        inside_parent_id,
        outside_parent_id,
        array_to_string(path, ',') AS "path"
FROM nodes;
