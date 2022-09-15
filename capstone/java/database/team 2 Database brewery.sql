begin transaction;
drop table if exists userTable,breweryTable,beerTable,reviewRatingTable,breweryBeerTable;
 
create table userTable
(userID serial not null,
firstName varchar(50) not null,
lastName varchar(50) not null,
email varchar(100) not null,
password varchar(50) not null,
dateOfBirth date not null,
active boolean not null,
role varchar(50) not null,
salt varchar(255),
constraint pk_user primary key(UserID));

create table breweryTable
(breweryID serial not null,
userID serial not null,
breweryName varchar(50) not null,
breweryPhoneNum varchar(50) not null,
breweryAddress varchar(100) not null,
breweryHistory varchar(500) not null,
openingHoursMonThur varchar(50) not null,
openingHoursFriSun varchar(50) not null,
imgPath character varying(200) not null,
active boolean not null,
constraint pk_brewery primary key(breweryID),
constraint fk_userTable_userID foreign key (userID) references userTable);

create table beerTable
(beerID serial not null,
beerName varchar(50) not null,
beerDescription varchar(500) not null,
beerType varchar(150) not null,
ABV varchar(50) not null,
active boolean not null,
imgPath character varying(200) not null,
constraint pk_beer primary key (beerID));

create table reviewRatingTable
(ratingID serial not null,
beerID serial not null,
userID serial not null,
titleOfReview varchar(50) not null,
mainText varchar(500) not null,
rating integer not null,
reviewDate date not null,
imgPath character varying(200),
constraint pk_reviewRating primary key(ratingID),
constraint fk_beerTable_beerID foreign key (beerID) references beerTable,
constraint fk_userTable_userID foreign key (userID) references userTable);

create table breweryBeerTable
(breweryID serial not null,
beerID serial not null,
constraint fk_beerTable_beerID foreign key (beerID) references beerTable,
constraint fk_breweryTable_breweryID foreign key (breweryID) references breweryTable);

drop table if exists app_user;
CREATE TABLE app_user (id SERIAL NOT NULL, user_name CHARACTER VARYING(32) NOT NULL, password CHARACTER VARYING(32) NOT NULL, first_name CHARACTER VARYING(32) NOT NULL, last_name CHARACTER VARYING(32) NOT NULL, role CHARACTER VARYING(32) NOT NULL, salt CHARACTER VARYING(255) NOT NULL, profile_image_id bigint ,active BOOLEAN, PRIMARY KEY (id), UNIQUE (user_name));
INSERT INTO app_user (id, user_name, password, first_name, last_name, role, salt, active) VALUES (1, 'test', '6PVA+4+F2VUDxB4+kdrlJQ==', 'david', 'vickars', 'standard', 'jP72xemDanXau65hNc+VruJyG1FGLQjU9JzoVFIn/CLJeT5x/9AkcrIe6cNAciJJiC5ERFy1bZU5gTGdJ+U1eEyGt5mVR8qUN/7KVL7oZyilkdtel11dCl582tWC1qJLmf+SvxITupsbFOGUqkTpW3PJHtBgRoS0HEg4C4SR3Oo=', true);
INSERT INTO app_user (id, user_name, password, first_name, last_name, role, salt, active) VALUES (4, 'rob', 'YmJH+WL8utqsvx2q6aBHZg==', 'rob', 'stewart', 'admin', '5ySh1gZQdL25Zl9CYjLWTt32UC4eBV06IKAE58xW2s29DzlhLdXOTGG3q189PCWjBMzAkTSJ+bfzF/3zwAlmUYFRcHtmzLDwallFRWTUQHJVxszLkLx6u+Ph2eVEwEaLPxOegvOehnx63hjl0qGTm3OA/M4Wwo9o0J2JPIuxCkY=', true);
commit;