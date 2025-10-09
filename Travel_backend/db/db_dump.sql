--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Approvals_status; Type: TYPE; Schema: public; Owner: travel_admin
--

CREATE TYPE public."enum_Approvals_status" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_Approvals_status" OWNER TO travel_admin;

--
-- Name: enum_Travels_status; Type: TYPE; Schema: public; Owner: travel_admin
--

CREATE TYPE public."enum_Travels_status" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_Travels_status" OWNER TO travel_admin;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: travel_admin
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'employee',
    'manager',
    'admin'
);


ALTER TYPE public."enum_Users_role" OWNER TO travel_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Alerts; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Alerts" (
    id integer NOT NULL,
    "travelId" integer NOT NULL,
    "alertType" character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    notified boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Alerts" OWNER TO travel_admin;

--
-- Name: Alerts_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Alerts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Alerts_id_seq" OWNER TO travel_admin;

--
-- Name: Alerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Alerts_id_seq" OWNED BY public."Alerts".id;


--
-- Name: Approvals; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Approvals" (
    id integer NOT NULL,
    "travelId" integer NOT NULL,
    "approverId" integer NOT NULL,
    status public."enum_Approvals_status" DEFAULT 'pending'::public."enum_Approvals_status",
    comments text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Approvals" OWNER TO travel_admin;

--
-- Name: Approvals_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Approvals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Approvals_id_seq" OWNER TO travel_admin;

--
-- Name: Approvals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Approvals_id_seq" OWNED BY public."Approvals".id;


--
-- Name: Documents; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Documents" (
    id integer NOT NULL,
    "travelId" integer NOT NULL,
    type character varying(255) NOT NULL,
    "fileUrl" character varying(255) NOT NULL,
    "expiryDate" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Documents" OWNER TO travel_admin;

--
-- Name: Documents_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Documents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Documents_id_seq" OWNER TO travel_admin;

--
-- Name: Documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Documents_id_seq" OWNED BY public."Documents".id;


--
-- Name: Policies; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Policies" (
    id integer NOT NULL,
    "policyName" character varying(255) NOT NULL,
    "travelPurpose" character varying(255),
    "bookingRules" json,
    "safetyRules" json,
    "expenseRules" json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Policies" OWNER TO travel_admin;

--
-- Name: Policies_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Policies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Policies_id_seq" OWNER TO travel_admin;

--
-- Name: Policies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Policies_id_seq" OWNED BY public."Policies".id;


--
-- Name: Travels; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Travels" (
    id integer NOT NULL,
    "employeeName" character varying(255) NOT NULL,
    destination character varying(255) NOT NULL,
    purpose character varying(255) NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    status public."enum_Travels_status" DEFAULT 'pending'::public."enum_Travels_status",
    budget double precision,
    "policyId" integer,
    "emergencyContact" character varying(255),
    "insuranceVerified" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."Travels" OWNER TO travel_admin;

--
-- Name: Travels_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Travels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Travels_id_seq" OWNER TO travel_admin;

--
-- Name: Travels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Travels_id_seq" OWNED BY public."Travels".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: travel_admin
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."enum_Users_role" DEFAULT 'employee'::public."enum_Users_role",
    department character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO travel_admin;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: travel_admin
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO travel_admin;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: travel_admin
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Alerts id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Alerts" ALTER COLUMN id SET DEFAULT nextval('public."Alerts_id_seq"'::regclass);


--
-- Name: Approvals id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Approvals" ALTER COLUMN id SET DEFAULT nextval('public."Approvals_id_seq"'::regclass);


--
-- Name: Documents id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Documents" ALTER COLUMN id SET DEFAULT nextval('public."Documents_id_seq"'::regclass);


--
-- Name: Policies id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Policies" ALTER COLUMN id SET DEFAULT nextval('public."Policies_id_seq"'::regclass);


--
-- Name: Travels id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Travels" ALTER COLUMN id SET DEFAULT nextval('public."Travels_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Alerts; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Alerts" (id, "travelId", "alertType", message, notified, "createdAt", "updatedAt") FROM stdin;
1	1	Document Expiry	passport is expiring on 2025-10-05	f	2025-10-03 20:43:17.467+05:30	2025-10-03 20:43:17.467+05:30
\.


--
-- Data for Name: Approvals; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Approvals" (id, "travelId", "approverId", status, comments, "createdAt", "updatedAt") FROM stdin;
1	1	2	approved	Budget within limits. Safe to travel.	2025-10-01 12:53:21.559+05:30	2025-10-01 12:53:21.559+05:30
\.


--
-- Data for Name: Documents; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Documents" (id, "travelId", type, "fileUrl", "expiryDate", "createdAt", "updatedAt") FROM stdin;
1	1	passport	http://example.com/passport.pdf	2030-05-20	2025-10-03 19:41:04.76+05:30	2025-10-03 19:41:04.76+05:30
2	1	passport	http://example.com/passport.pdf	2025-10-05	2025-10-03 20:31:11.593+05:30	2025-10-03 20:31:11.593+05:30
\.


--
-- Data for Name: Policies; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Policies" (id, "policyName", "travelPurpose", "bookingRules", "safetyRules", "expenseRules", "createdAt", "updatedAt") FROM stdin;
1	Default Travel Policy	Business	{"class":"Economy","advanceBookingDays":14}	{"insurance":true,"riskAssessment":true}	{"perDiem":50,"receiptDeadlineDays":7}	2025-09-29 14:31:20.641+05:30	2025-09-29 14:31:20.641+05:30
2	International Travel Policy	Client Meeting	{"class":"Business","advanceBookingDays":21}	{"insurance":true,"riskAssessment":true}	{"perDiem":100,"receiptDeadlineDays":7}	2025-09-30 13:10:05.933+05:30	2025-09-30 13:10:05.933+05:30
\.


--
-- Data for Name: Travels; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Travels" (id, "employeeName", destination, purpose, "startDate", "endDate", status, budget, "policyId", "emergencyContact", "insuranceVerified", "createdAt", "updatedAt", "userId") FROM stdin;
1	Emily Employee	Australia	Client Meeting	2025-12-05	2025-12-12	approved	120000	1	+91-9812345678	f	2025-10-01 12:14:29.507+05:30	2025-10-01 12:53:21.574+05:30	3
2	ParveenTaj Employee	Australia	Client Meeting	2025-10-15	2025-10-20	pending	2000	1	+911234567890	f	2025-10-03 20:27:53.515+05:30	2025-10-03 20:27:53.515+05:30	7
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: travel_admin
--

COPY public."Users" (id, name, email, password, role, department, "createdAt", "updatedAt") FROM stdin;
1	Super Admin	admin@corp.com	$2b$10$YumZRnlV1lcgTIup/mIAruopk/9lu7S.VYX5f/I5e111TLVdEuTGe	admin	HR	2025-09-29 14:31:20.618+05:30	2025-09-29 14:31:20.618+05:30
2	John Manager	manager@corp.com	$2b$10$qVsFU1zggBaw7LIK3/Njju56wGu9k2IasgfNLFs8ZzLAyyLXSqtFy	manager	Sales	2025-09-29 14:31:20.637+05:30	2025-09-29 14:31:20.637+05:30
3	Emily Employee	employee@corp.com	$2b$10$mOrolyMTED6F5MWsdtNTyO24KZVRanCAZ1gX8tFEsmJvKPx4kxc7m	employee	Marketing	2025-09-29 14:31:20.639+05:30	2025-09-29 14:31:20.639+05:30
4	Alice Tester	alice@corp.com	$2b$10$84eZ771.yBrfumRWiJkiBOaaN0VsvLgZxQXV/mPkqv8uUfxU.HlmG	employee	QA	2025-09-30 10:53:28.834+05:30	2025-09-30 10:53:28.834+05:30
5	Afreen Admin	afreen@corp.com	$2b$10$ZoCZNUILhwrRpCsbl5tS7urJdw9QjNsljn5z2IzAwhlpV563bhEjO	admin	HR	2025-09-30 11:26:55.858+05:30	2025-09-30 11:26:55.858+05:30
6	AfreenTaj employee	afreentaj@corp.com	$2b$10$Qz3T2GHG0gs8J6USW3nnQuijN/9xsI3HXvO6FuQ.4pqaPYM8ElQMK	employee	HR	2025-09-30 11:27:41.89+05:30	2025-09-30 11:27:41.89+05:30
7	ParveenTaj Employee	parveentaj@corp.com	$2b$10$9QGMvYOn32utyrjw0yJvteflDIY6Y.RktxSaDGLAJqE8L/zWB8qJm	employee	Marketing	2025-09-30 12:58:36.248+05:30	2025-09-30 12:58:36.248+05:30
\.


--
-- Name: Alerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Alerts_id_seq"', 1, true);


--
-- Name: Approvals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Approvals_id_seq"', 1, true);


--
-- Name: Documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Documents_id_seq"', 2, true);


--
-- Name: Policies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Policies_id_seq"', 2, true);


--
-- Name: Travels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Travels_id_seq"', 2, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: travel_admin
--

SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);


--
-- Name: Alerts Alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Alerts"
    ADD CONSTRAINT "Alerts_pkey" PRIMARY KEY (id);


--
-- Name: Approvals Approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Approvals"
    ADD CONSTRAINT "Approvals_pkey" PRIMARY KEY (id);


--
-- Name: Documents Documents_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY (id);


--
-- Name: Policies Policies_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Policies"
    ADD CONSTRAINT "Policies_pkey" PRIMARY KEY (id);


--
-- Name: Travels Travels_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Travels"
    ADD CONSTRAINT "Travels_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_email_key1; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);


--
-- Name: Users Users_email_key10; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key10" UNIQUE (email);


--
-- Name: Users Users_email_key11; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key11" UNIQUE (email);


--
-- Name: Users Users_email_key12; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key12" UNIQUE (email);


--
-- Name: Users Users_email_key13; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key13" UNIQUE (email);


--
-- Name: Users Users_email_key14; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key14" UNIQUE (email);


--
-- Name: Users Users_email_key15; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key15" UNIQUE (email);


--
-- Name: Users Users_email_key16; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key16" UNIQUE (email);


--
-- Name: Users Users_email_key2; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);


--
-- Name: Users Users_email_key3; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);


--
-- Name: Users Users_email_key4; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key4" UNIQUE (email);


--
-- Name: Users Users_email_key5; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key5" UNIQUE (email);


--
-- Name: Users Users_email_key6; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key6" UNIQUE (email);


--
-- Name: Users Users_email_key7; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key7" UNIQUE (email);


--
-- Name: Users Users_email_key8; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key8" UNIQUE (email);


--
-- Name: Users Users_email_key9; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key9" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Alerts Alerts_travelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Alerts"
    ADD CONSTRAINT "Alerts_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES public."Travels"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Approvals Approvals_approverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Approvals"
    ADD CONSTRAINT "Approvals_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Approvals Approvals_travelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Approvals"
    ADD CONSTRAINT "Approvals_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES public."Travels"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Documents Documents_travelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES public."Travels"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Travels Travels_policyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Travels"
    ADD CONSTRAINT "Travels_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES public."Policies"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Travels Travels_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: travel_admin
--

ALTER TABLE ONLY public."Travels"
    ADD CONSTRAINT "Travels_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

