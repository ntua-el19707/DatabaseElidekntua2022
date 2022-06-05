

/*KODIKAS SQL GIA TIN VASI ME OLA  TA TABLES/CONSTRAINTS/TRIGGERS/INDEXES/QUERIES */
drop database ELIDEK ;
create database ELIDEK ;
use  ELIDEK ;

CREATE TABLE Project(
	Title  VARCHAR(20) not null ,
	Summary VARCHAR(500) ,
	BeginDate DATE not null  ,
	ExpiryDate DATE not null ,
	PRIMARY KEY( Title)
);
CREATE  TABLE Address(
	PostCode INT not null ,
	Street VARCHAR(50) not null,
	City varchar(20),
    address_id INT not null AUTO_INCREMENT ,
    PRIMARY KEY(address_id,PostCode,Street)
);
CREATE TABLE Organization(
	name varchar(20) not null, 
	shortcut varchar(5),
     type_of_organization ENUM("university","company","research center"), 	
	PRIMARY KEY(name)
);
CREATE TABLE  Researcher(
	name varchar(20) not null , 
	Surname varchar(20) ,
	Sex ENUM('Male', 'Female'),
	DateOfBirth DATE ,
	Researher_id int not null AUTO_INCREMENT,
	organization varchar(20) not null,
	PRIMARY KEY (Researher_id));
CREATE TABLE Executive_Manager(
	name varchar (20) not null, 
	Executive_manger_id int not null AUTO_INCREMENT,
	PRIMARY KEY(Executive_manger_id)
);
CREATE TABLE Evalulation(
	grade INT ,
	Date_of_Evalulation  Date 
) ;
CREATE TABLE Delivered(
	Summary varchar (20)
); /* Deliverd is a weak  entity */
CREATE TABLE Funding_Program(
	name varchar(20) not null,
	Budget DECIMAL(9,2) ,
	PRIMARY KEY(name)
	);
CREATE TABLE Company(
	Budget DECIMAL(9,2));
CREATE TABLE University(
	Budget_From_Ministry_of_Education DECIMAL(9,2));
CREATE TABLE Researcher_Center(
	Budget_From_Ministry_of_Education DECIMAL(9,2),
	Budget_From_Private_Actions DECIMAL(9,2));
/*Project Relation*/
ALTER TABLE Project
ADD managerID int NOT NULL,
ADD CONSTRAINT Project_Manager FOREIGN KEY (managerID)
REFERENCES Executive_Manager (Executive_manger_id) ON  DELETE CASCADE ON UPDATE CASCADE ;

ALTER TABLE Project
ADD fundin VARCHAR(20),
ADD CONSTRAINT Project_funding FOREIGN KEY (fundin)
REFERENCES Funding_Program(name) ON  DELETE CASCADE ON UPDATE CASCADE ;


ALTER TABLE Project
ADD Organization_name varchar(20) NOT NULL,
ADD CONSTRAINT Project_belongs FOREIGN KEY (Organization_name)
REFERENCES  Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE ;

ALTER TABLE Project
ADD Researcher_ID int NOT NULL ,
ADD CONSTRAINT Researcher_manager FOREIGN KEY (Researcher_ID)
REFERENCES  Researcher (Researher_id) ON  DELETE CASCADE ON UPDATE CASCADE ;

/*Funding program Relation*/
ALTER TABLE Funding_Program
ADD address_ID int ,
ADD CONSTRAINT Funding_program_organization_address FOREIGN KEY (address_ID)
REFERENCES  Address (address_id) ON  DELETE CASCADE ON UPDATE CASCADE ;

/*ISA*/
ALTER TABLE University
ADD Organization_name varchar(20),
ADD CONSTRAINT Organization_is_University FOREIGN KEY (Organization_name)
REFERENCES  Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE ;

ALTER TABLE Company
ADD Organization_name   varchar(20),
ADD CONSTRAINT Organization_is_Company FOREIGN KEY (Organization_name)
REFERENCES  Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE ;

ALTER TABLE Researcher_Center
ADD Organization_name   varchar(20),
ADD CONSTRAINT Organization_is_reaserch_center FOREIGN KEY (Organization_name)
REFERENCES  Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE ;
/*Organization Relation*/
ALTER TABLE Organization
ADD address_id int,
ADD CONSTRAINT Organization_has_address FOREIGN KEY (address_id)
REFERENCES  Address (address_id) ON  DELETE CASCADE ON UPDATE CASCADE ;

/*Evaluation*/
ALTER TABLE Evalulation
ADD project_title varchar(20),
ADD CONSTRAINT Evaluation_of_project FOREIGN KEY (project_title)
REFERENCES  Project (Title ) ON  DELETE CASCADE ON UPDATE CASCADE, 
ADD reasearcher_id int,
ADD CONSTRAINT reasercher_who_eval FOREIGN KEY (reasearcher_id)
REFERENCES  Researcher (Researher_id) ON  DELETE CASCADE ON UPDATE CASCADE;
/*Researcher*/
CREATE TABLE WORK_ON(
	worker_id int,
	project_title varchar(20) ,
	CONSTRAINT Researcher_that_works_on_project FOREIGN KEY (worker_id)
	REFERENCES  Researcher (Researher_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT Project_that_Researcher_works FOREIGN KEY (project_title)
	REFERENCES  Project (Title ) ON  DELETE CASCADE ON UPDATE CASCADE);
/*Delivery Sxesi*/
	create table project_to_delivery(
	Date_of_Delivery Date,
	title varchar(20),
	CONSTRAINT Project_to_Delivered FOREIGN KEY (title)
	REFERENCES   Project(title) ON  DELETE CASCADE ON UPDATE CASCADE );

ALTER TABLE Delivered
ADD title varchar(20),
ADD CONSTRAINT Project_has_been_Delivered FOREIGN KEY (title)
REFERENCES   project_to_delivery(title) ON  DELETE CASCADE ON UPDATE CASCADE ;

CREATE TABLE scientific_field(
	name ENUM('Physics','Biology','Chemistry','Zoology','Astronomy','Medicine','Astrophysics','Earthsciences','Pharmacy','Human Sciences') not null,
	title_pr varchar(20) not null,
	CONSTRAINT Project_has_field FOREIGN KEY (title_pr)
REFERENCES   Project(Title) ON  DELETE CASCADE ON UPDATE CASCADE );
CREATE TABLE Employee_Relationship(
	Date_of_begin DATE not null,
	name varchar(20),
    researcher_id int,	
	CONSTRAINT Organization_employee_works_for FOREIGN KEY (name)
	REFERENCES   Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT employee_has_id FOREIGN KEY (researcher_id)
 	REFERENCES   Researcher(Researher_id) ON  DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE phones(
    name varchar(20) not null,
	phone varchar(15) not null,
    CONSTRAINT Organization_ph   FOREIGN KEY (name)
    REFERENCES   Organization (name) ON  DELETE CASCADE ON UPDATE CASCADE) ;
ALTER TABLE Researcher
	ADD CONSTRAINT organization_of_researcher FOREIGN KEY(organization)
	REFERENCES Organization (name) ON DELETE CASCADE ON UPDATE CASCADE ;


/*triggers
elegxos oti i diarkia tou ergou ine 4 xronia*/
DELIMITER $$
CREATE TRIGGER INVALID_DATE
BEFORE INSERT 
ON Project  FOR EACH ROW
BEGIN 
         IF(DATEDIFF(new.ExpiryDate,new.BeginDate)  < 365 OR DATEDIFF(new.ExpiryDate,new.BeginDate )  >1461 ) THEN 
		          signal sqlstate '45000' set message_text = 'Invalid Date set' ;
		END IF;
END$$
DELIMITER;

/*elegxos oti to researcher id ine integer*/
DELIMITER $$
CREATE TRIGGER check_researcher_id
BEFORE INSERT
ON researcher FOR EACH ROW
BEGIN
IF (new.researcher_id not REGEXP '^[0-9]+$') THEN
signal sqlstate '45000' set message_text = 'Invalid id number';
END IF;
END$$
DELIMITER ;

/*CHECK INPUT DATE ON PROJECT*/
DELIMITER $$
CREATE TRIGGER check_insertBegin/Expiry_Date
BEFORE INSERT
ON Project FOR EACH ROW
BEGIN
    IF (STR_TO_DATE(new.BeginDate, '%Y,%m,%d') IS  NULL)  THEN     
        signal sqlstate '45000' set message_text = 'Invalid identity date! CORRECT FORMAT: Year,Month,Date';
	IF (STR_TO_DATE(new.ExpiryDate, '%Y,%m,%d') IS  NULL)  THEN     
        signal sqlstate '45000' set message_text = 'Invalid identity date! CORRECT FORMAT: Year,Month,Date';
END IF;     
END IF;
END$$
DELIMITER ;

/*CHECK INPUT ON PHONES*/
DELIMITER $$
CREATE TRIGGER INVALID_PHONE
BEFORE INSERT 
ON phones  FOR EACH ROW
BEGIN 
         IF(new.phone not REGEXP '[0-9]+$' ) THEN 
		          signal sqlstate '45000' set message_text = 'Invalid phone' ;
		END IF;
END$$
DELIMITER ;  

/*LIMIT BUDGET OF A FUNDING PROGRAM*/
DELIMITER $$
CREATE TRIGGER INVALID_BUDGET
BEFORE INSERT 
ON   Funding_Program FOR EACH ROW
BEGIN 
         IF(new.Budget < 100000.00 OR new.Budget > 1000000.00) THEN 
		          signal sqlstate '45000' set message_text = 'invalid_budget' ;
		END IF;
END$$
DELIMITER ;

/*INDEXES
gia na vrisko efkola apo poio programma xorigounte ta erga*/
CREATE INDEX funding_program_of_a_project ON project(Title,fundin)

/*gia na vrisko efkola tin imerominia enarxis kai lixis ton ergon*/
CREATE INDEX Begin_Expiry_Date_of_a_Program ON project(BeginDate,ExpiryDate)

/*gia na vrisko efkola tous organismous ton erevniton*/
CREATE INDEX organizations_of_researchers ON researcher(Researher_id,organization)

/*VIEWS*/
/*WORKERS OF A PROJECT*/
CREATE VIEW WORKS_project AS
SELECT  project_title,Researcher.Researher_id ,Researcher.name,Researcher.Surname,Researcher.Sex FROM WORK_ON
FULL JOIN  Researcher
ON  worker_id = Researcher.Researher_id 
WHERE project_title = 'PR2';
WHERE Project.fundin != NULL ;

/*VIEWS FOR ORGANIZATIONS*/
CREATE VIEW ORG_UNI AS
SELECT * FROM organization
WHERE type_of_organization="University"

CREATE VIEW ORG_COMP AS
SELECT * FROM organization
WHERE type_of_organization="company"
 
CREATE VIEW ORG_RC AS
SELECT * FROM organization
WHERE type_of_organization="research center"


/*query 3.2*/

CREATE VIEW Projects_per_Researcher AS
SELECT r.name, r.Surname, r.Researcher_id, w.project_title 
FROM researcher AS r JOIN work_on AS w ON w.worker_id=r.Researcher_id;

CREATE VIEW active_projects
SELECT * FROM Projects
WHERE Projects.ExpiryDate > NOW()	


/*query 3.3*/
CREATE VIEW Endiaferon_SF AS	
SELECT title_pr FROM scientific_field
WHERE name=given//from ui


/*active projects pou exoun to scientific field pou mas endiaferei*/ 
CREATE VIEW Projects_of_selected_scientific_field AS
SELECT ap.Title FROM active_projects AS ap
JOIN Emdiaferon_SF AS ef
ON ap.Title=ef.title_pr

/*researchers gia to field*/
CREATE VIEW researchers_of_selected_scientific_field AS
SELECT r.name,r.Surname,r.Researher_id FROM projects_per_researcher AS r
JOIN active_projects AS ap ON ap.Title=r.project_title
JOIN projects_of_selected_scientific_field AS ps
ON ps.Title=r.project_title;

/*query 3.4*/ 
/*VIEW GIA 3.4*/
CREATE VIEW organization_years AS
SELECT Organization_name, extract(YEAR FROM BeginDate) as yr, COUNT(1) as emfanisi
FROM project
GROUP BY Organization_name, BeginDate
HAVING COUNT(1)>=10


SELECT DISTINCT oy1.Organization_name FROM organization_years AS oy1
JOIN organization_years AS oy2
ON oy1.Organization_name=oy2.Organization_name
WHERE oy1.yr-oy2.yr=0 AND oy1.Organization_name=oy2.Organization_name AND oy1.emfanisi=oy2.emfanisi


/*query 3.5*/

SELECT sf1.name, sf2.name, COUNT(1) FROM scientific_field AS sf1
JOIN scientific_field AS sf2
ON sf1.title_pr=sf2.title_pr	
WHERE sf1.name<sf2.name
GROUP BY sf1.name,sf2.name
ORDER BY COUNT(1) DESC
LIMIT 3


/*query 3.6*/

SELECT r.Researher_id, r.name,COUNT(w.project_title) AS projects FROM researcher AS r 
JOIN work_on as w 
ON r.Researcher_id = w.worker_id 
JOIN active_projects AS ap 
ON w.project_title = ap.Title 
WHERE LEFT(NOW(),4) - LEFT(r.DateOfBirth, 4) < 40 
GROUP BY r.Researcher_id ORDER BY projects DESC


/*query 3.7*/
CREATE VIEW manager_fundings AS 
SELECT em.name, fp.Budget FROM executive_manager AS em
JOIN project AS p ON em.Executive_manger_id=p.managerID
JOIN funding_program AS fp ON p.fundin=fp.name

SELECT mf.name, mf.Budget, o.name FROM managers_fundings AS mf
JOIN organization AS o ON o.type_of_organization="company"
ORDER BY mf.Budget DESC
LIMIT 5

/*query 3.8*/

SELECT r.Researcher_id,r.name,r.Surname,COUNT(w.project_title) AS projects  FROM researcher AS r
JOIN work_on AS w ON r.Researcher_id = w.worker_id
JOIN project AS p ON p.Title = w.project_title
LEFT JOIN delivered AS d ON d.title = p.Title
WHERE d.Summary IS NULL
GROUP BY r.Researcher_id
HAVING projects >= 5 