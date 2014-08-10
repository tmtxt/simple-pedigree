--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.pedigree DROP CONSTRAINT pedigree_root_id_fkey;
ALTER TABLE ONLY public.marriage DROP CONSTRAINT marriage_wife_id_fkey;
ALTER TABLE ONLY public.marriage DROP CONSTRAINT marriage_husband_id_fkey;
ALTER TABLE ONLY public.hierarchy DROP CONSTRAINT hierarchy_mother_id_fkey;
ALTER TABLE ONLY public.hierarchy DROP CONSTRAINT hierarchy_father_id_fkey;
ALTER TABLE ONLY public.hierarchy DROP CONSTRAINT hierarchy_child_id_fkey;
DROP INDEX public.un_marriage_wife;
DROP INDEX public.un_marriage_husband;
DROP INDEX public.un_hierarchy_mother;
DROP INDEX public.un_hierarchy_father;
ALTER TABLE ONLY public.users DROP CONSTRAINT un_users;
ALTER TABLE ONLY public.marriage DROP CONSTRAINT un_marriage_compound;
ALTER TABLE ONLY public.hierarchy DROP CONSTRAINT un_hierarchy_compound;
ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
ALTER TABLE ONLY public.person DROP CONSTRAINT person_pkey;
ALTER TABLE ONLY public.pedigree DROP CONSTRAINT pedigree_root_id_key;
ALTER TABLE ONLY public.pedigree DROP CONSTRAINT pedigree_pkey;
ALTER TABLE ONLY public.marriage DROP CONSTRAINT marriage_pkey;
ALTER TABLE ONLY public.hierarchy DROP CONSTRAINT hierarchy_pkey;
ALTER TABLE ONLY public."YiiSession" DROP CONSTRAINT "YiiSession_pkey";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.person ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.pedigree ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.marriage ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.hierarchy ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP TABLE public.schemup_tables;
DROP SEQUENCE public.person_id_seq;
DROP SEQUENCE public.pedigree_id_seq;
DROP TABLE public.pedigree;
DROP VIEW public.marriage_union;
DROP SEQUENCE public.marriage_id_seq;
DROP TABLE public.marriage;
DROP VIEW public.hierarchy_union;
DROP TABLE public.person;
DROP SEQUENCE public.hierarchy_id_seq;
DROP TABLE public.hierarchy;
DROP TABLE public."YiiSession";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: YiiSession; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "YiiSession" (
    id character(32) NOT NULL,
    expire integer,
    data bytea
);


--
-- Name: hierarchy; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE hierarchy (
    id integer NOT NULL,
    father_id integer,
    mother_id integer,
    child_id bigint NOT NULL,
    child_order smallint,
    CONSTRAINT hierarchy_check CHECK (((((father_id IS NOT NULL) AND (mother_id IS NOT NULL)) OR ((father_id IS NULL) AND (mother_id IS NOT NULL))) OR ((father_id IS NOT NULL) AND (mother_id IS NULL))))
);


--
-- Name: hierarchy_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE hierarchy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hierarchy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE hierarchy_id_seq OWNED BY hierarchy.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE person (
    id integer NOT NULL,
    name character varying(500),
    birth_date timestamp without time zone DEFAULT now(),
    death_date timestamp without time zone DEFAULT now(),
    alive_status smallint,
    job text,
    address text,
    picture text,
    gender smallint,
    phone_no character varying(50),
    id_card character varying(50),
    history text,
    other_information text
);


--
-- Name: hierarchy_union; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW hierarchy_union AS
    SELECT h.father_id AS inside_parent_id, p1.name AS inside_parent_name, h.mother_id AS outside_parent_id, p2.name AS outside_parent_name, h.child_id, p3.name AS child_name, h.child_order FROM hierarchy h, person p1, person p2, person p3 WHERE (((h.father_id = p1.id) AND (h.mother_id = p2.id)) AND (h.child_id = p3.id)) UNION SELECT h.mother_id AS inside_parent_id, p1.name AS inside_parent_name, h.father_id AS outside_parent_id, p2.name AS outside_parent_name, h.child_id, p3.name AS child_name, h.child_order FROM hierarchy h, person p1, person p2, person p3 WHERE (((h.mother_id = p1.id) AND (h.father_id = p2.id)) AND (h.child_id = p3.id));


--
-- Name: marriage; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE marriage (
    id integer NOT NULL,
    husband_id integer,
    wife_id integer,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    status smallint,
    information text,
    "order" smallint,
    CONSTRAINT marriage_check CHECK (((((husband_id IS NOT NULL) AND (wife_id IS NOT NULL)) OR ((husband_id IS NULL) AND (wife_id IS NOT NULL))) OR ((husband_id IS NOT NULL) AND (wife_id IS NULL))))
);


--
-- Name: marriage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE marriage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: marriage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE marriage_id_seq OWNED BY marriage.id;


--
-- Name: marriage_union; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW marriage_union AS
    SELECT mr.husband_id AS inside_person_id, p1.name AS inside_person_name, p1.picture AS inside_person_picture, mr.wife_id AS outside_person_id, p2.name AS outside_person_name, p2.picture AS outside_person_picture, mr.start_date, mr.end_date, mr.status, mr.information, mr."order" FROM marriage mr, person p1, person p2 WHERE ((mr.husband_id = p1.id) AND (mr.wife_id = p2.id)) UNION SELECT mr.wife_id AS inside_person_id, p1.name AS inside_person_name, p1.picture AS inside_person_picture, mr.husband_id AS outside_person_id, p2.name AS outside_person_name, p2.picture AS outside_person_picture, mr.start_date, mr.end_date, mr.status, mr.information, mr."order" FROM marriage mr, person p1, person p2 WHERE ((mr.wife_id = p1.id) AND (mr.husband_id = p2.id));


--
-- Name: pedigree; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE pedigree (
    id integer NOT NULL,
    root_id integer NOT NULL,
    living_place text,
    other_information text,
    name text
);


--
-- Name: pedigree_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pedigree_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pedigree_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pedigree_id_seq OWNED BY pedigree.id;


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE person_id_seq OWNED BY person.id;


--
-- Name: schemup_tables; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schemup_tables (
    table_name character varying NOT NULL,
    version character varying NOT NULL,
    is_current boolean DEFAULT false NOT NULL,
    schema text
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    password text NOT NULL,
    username character varying NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY hierarchy ALTER COLUMN id SET DEFAULT nextval('hierarchy_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY marriage ALTER COLUMN id SET DEFAULT nextval('marriage_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pedigree ALTER COLUMN id SET DEFAULT nextval('pedigree_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY person ALTER COLUMN id SET DEFAULT nextval('person_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: YiiSession; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "YiiSession" (id, expire, data) FROM stdin;
nmkev5jufj02sjr8f116o8ov63      	1407682822	\\x36366361656239373763616538336161383563393664363263363936373237345969692e43576562557365722e666c617368636f756e746572737c613a303a7b7d
\.


--
-- Data for Name: hierarchy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY hierarchy (id, father_id, mother_id, child_id, child_order) FROM stdin;
1	1	2	3	\N
2	1	2	5	\N
3	1	2	7	\N
4	1	2	9	\N
\.


--
-- Name: hierarchy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('hierarchy_id_seq', 4, true);


--
-- Data for Name: marriage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY marriage (id, husband_id, wife_id, start_date, end_date, status, information, "order") FROM stdin;
1	1	2	\N	\N	\N	\N	\N
2	3	4	\N	\N	\N	\N	\N
3	5	6	\N	\N	\N	\N	\N
4	9	8	\N	\N	\N	\N	\N
\.


--
-- Name: marriage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('marriage_id_seq', 4, true);


--
-- Data for Name: pedigree; Type: TABLE DATA; Schema: public; Owner: -
--

COPY pedigree (id, root_id, living_place, other_information, name) FROM stdin;
1	1	\N	\N	\N
\.


--
-- Name: pedigree_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('pedigree_id_seq', 1, true);


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--

COPY person (id, name, birth_date, death_date, alive_status, job, address, picture, gender, phone_no, id_card, history, other_information) FROM stdin;
1	Root husband	2014-08-10 14:03:24.441343	2014-08-10 14:03:24.441343	0	\N	\N	\N	0	\N	\N	\N	\N
2	Root wife	2014-08-10 14:03:37.637801	2014-08-10 14:03:37.637801	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	f2-1 husband	2014-08-10 14:03:52.038667	2014-08-10 14:03:52.038667	\N	\N	\N	\N	\N	\N	\N	\N	\N
4	f2-1 wife	2014-08-10 14:03:57.09463	2014-08-10 14:03:57.09463	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	f2-2 husband	2014-08-10 14:04:04.357075	2014-08-10 14:04:04.357075	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	f2-2 wife	2014-08-10 14:04:18.245357	2014-08-10 14:04:18.245357	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	f2-3 wife	2014-08-10 14:04:28.892704	2014-08-10 14:04:28.892704	\N	\N	\N	\N	\N	\N	\N	\N	\N
8	f2-3 husband	2014-08-10 14:04:33.436678	2014-08-10 14:04:33.436678	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	f2-4 husband	2014-08-10 14:04:43.267963	2014-08-10 14:04:43.267963	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('person_id_seq', 9, true);


--
-- Data for Name: schemup_tables; Type: TABLE DATA; Schema: public; Owner: -
--

COPY schemup_tables (table_name, version, is_current, schema) FROM stdin;
user	txt_1	t	
person	txt_1	t	address|text|YES|None\nalive_status|smallint|YES|None\nbirth_date|timestamp without time zone|YES|now()\ndeath_date|timestamp without time zone|YES|now()\ngender|smallint|YES|None\nhistory|text|YES|None\nid|integer|NO|nextval('person_id_seq'::regclass)\nid_card|character varying|YES|None\njob|text|YES|None\nname|character varying|YES|None\nother_information|text|YES|None\nphone_no|character varying|YES|None\npicture|text|YES|None
marriage	txt_1	t	end_date|timestamp without time zone|YES|None\nhusband_id|integer|YES|None\nid|integer|NO|nextval('marriage_id_seq'::regclass)\ninformation|text|YES|None\norder|smallint|YES|None\nstart_date|timestamp without time zone|YES|None\nstatus|smallint|YES|None\nwife_id|integer|YES|None
hierarchy	txt_1	t	child_id|bigint|NO|None\nchild_order|smallint|YES|None\nfather_id|integer|YES|None\nid|integer|NO|nextval('hierarchy_id_seq'::regclass)\nmother_id|integer|YES|None
marriage_union	txt_1	t	end_date|timestamp without time zone|YES|None\ninformation|text|YES|None\ninside_person_id|integer|YES|None\ninside_person_name|character varying|YES|None\ninside_person_picture|text|YES|None\norder|smallint|YES|None\noutside_person_id|integer|YES|None\noutside_person_name|character varying|YES|None\noutside_person_picture|text|YES|None\nstart_date|timestamp without time zone|YES|None\nstatus|smallint|YES|None
hierarchy_union	txt_1	t	child_id|bigint|YES|None\nchild_name|character varying|YES|None\nchild_order|smallint|YES|None\ninside_parent_id|integer|YES|None\ninside_parent_name|character varying|YES|None\noutside_parent_id|integer|YES|None\noutside_parent_name|character varying|YES|None
pedigree	txt_1	f	id|integer|NO|nextval('pedigree_id_seq'::regclass)\nliving_place|text|YES|None\nother_information|text|YES|None\nroot_id|integer|NO|None
pedigree	txt_2	t	id|integer|NO|nextval('pedigree_id_seq'::regclass)\nliving_place|text|YES|None\nname|text|YES|None\nother_information|text|YES|None\nroot_id|integer|NO|None
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (id, password, username) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: YiiSession_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "YiiSession"
    ADD CONSTRAINT "YiiSession_pkey" PRIMARY KEY (id);


--
-- Name: hierarchy_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY hierarchy
    ADD CONSTRAINT hierarchy_pkey PRIMARY KEY (id);


--
-- Name: marriage_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY marriage
    ADD CONSTRAINT marriage_pkey PRIMARY KEY (id);


--
-- Name: pedigree_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pedigree
    ADD CONSTRAINT pedigree_pkey PRIMARY KEY (id);


--
-- Name: pedigree_root_id_key; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pedigree
    ADD CONSTRAINT pedigree_root_id_key UNIQUE (root_id);


--
-- Name: person_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: pk_users; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: un_hierarchy_compound; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY hierarchy
    ADD CONSTRAINT un_hierarchy_compound UNIQUE (father_id, mother_id, child_id);


--
-- Name: un_marriage_compound; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY marriage
    ADD CONSTRAINT un_marriage_compound UNIQUE (husband_id, wife_id);


--
-- Name: un_users; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT un_users UNIQUE (username);


--
-- Name: un_hierarchy_father; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX un_hierarchy_father ON hierarchy USING btree (father_id, child_id) WHERE (mother_id IS NULL);


--
-- Name: un_hierarchy_mother; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX un_hierarchy_mother ON hierarchy USING btree (mother_id, child_id) WHERE (father_id IS NULL);


--
-- Name: un_marriage_husband; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX un_marriage_husband ON marriage USING btree (husband_id) WHERE (wife_id IS NULL);


--
-- Name: un_marriage_wife; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX un_marriage_wife ON marriage USING btree (wife_id) WHERE (husband_id IS NULL);


--
-- Name: hierarchy_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hierarchy
    ADD CONSTRAINT hierarchy_child_id_fkey FOREIGN KEY (child_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: hierarchy_father_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hierarchy
    ADD CONSTRAINT hierarchy_father_id_fkey FOREIGN KEY (father_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: hierarchy_mother_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY hierarchy
    ADD CONSTRAINT hierarchy_mother_id_fkey FOREIGN KEY (mother_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: marriage_husband_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY marriage
    ADD CONSTRAINT marriage_husband_id_fkey FOREIGN KEY (husband_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: marriage_wife_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY marriage
    ADD CONSTRAINT marriage_wife_id_fkey FOREIGN KEY (wife_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: pedigree_root_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pedigree
    ADD CONSTRAINT pedigree_root_id_fkey FOREIGN KEY (root_id) REFERENCES person(id) ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

