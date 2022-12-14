begin transaction;
set datestyle to ISO,MDY;

drop table if exists userTable,breweryTable,beerTable,reviewRatingTable,breweryBeerTable, userFavouriteBrewery, image;
drop sequence if exists user_serial, brewery_serial, beer_serial, rating_serial;

-- drop table if exists app_user;
-- CREATE TABLE app_user (id SERIAL NOT NULL, user_name CHARACTER VARYING(32) NOT NULL, password CHARACTER VARYING(32) NOT NULL, first_name CHARACTER VARYING(32) NOT NULL, last_name CHARACTER VARYING(32) NOT NULL, role CHARACTER VARYING(32) NOT NULL, salt CHARACTER VARYING(255) NOT NULL, profile_image_id bigint ,active BOOLEAN, PRIMARY KEY (id), UNIQUE (user_name));
-- INSERT INTO app_user (user_name, password, first_name, last_name, role, salt, active) VALUES ('test', '6PVA+4+F2VUDxB4+kdrlJQ==', 'david', 'vickars', 'standard', 'jP72xemDanXau65hNc+VruJyG1FGLQjU9JzoVFIn/CLJeT5x/9AkcrIe6cNAciJJiC5ERFy1bZU5gTGdJ+U1eEyGt5mVR8qUN/7KVL7oZyilkdtel11dCl582tWC1qJLmf+SvxITupsbFOGUqkTpW3PJHtBgRoS0HEg4C4SR3Oo=', true);
-- INSERT INTO app_user (user_name, password, first_name, last_name, role, salt, active) VALUES ('rob', 'YmJH+WL8utqsvx2q6aBHZg==', 'rob', 'stewart', 'admin', '5ySh1gZQdL25Zl9CYjLWTt32UC4eBV06IKAE58xW2s29DzlhLdXOTGG3q189PCWjBMzAkTSJ+bfzF/3zwAlmUYFRcHtmzLDwallFRWTUQHJVxszLkLx6u+Ph2eVEwEaLPxOegvOehnx63hjl0qGTm3OA/M4Wwo9o0J2JPIuxCkY=', true);


create sequence user_serial;
create table userTable
(userID int not null default nextval('user_serial'),
 firstName varchar(50) not null,
 lastName varchar(50) not null,
 user_name varchar(100) not null,
 password varchar(50) not null,
 dateOfBirth varchar(10),
 active boolean not null,
 role varchar(50) not null,
 salt varchar(255),
 constraint pk_user primary key(userID));

create sequence brewery_serial;
create table breweryTable
(breweryID int not null default nextval('brewery_serial'),
 userID serial,
 breweryName varchar(50) not null,
 breweryPhoneNum varchar(50) not null,
 breweryAddress varchar(100) not null,
 breweryHistory varchar(500) not null,
 openingHoursMonThur varchar(50) not null,
 openingHoursFriSun varchar(50) not null,
 imgPath character varying(200) not null,
 active boolean not null,
 latitude decimal(11,8),
 longitude decimal(11,8),
 brewerynews varchar(500),
 constraint pk_brewery primary key(breweryID),
 constraint fk_userTable_userID foreign key (userID) references userTable);

create sequence beer_serial;
create table beerTable
(beerID int not null default nextval('beer_serial'),
 beerName varchar(50) not null,
 beerDescription varchar(500) not null,
 beerType varchar(150) not null,
 ABV varchar(50) not null,
 active boolean not null,
 imgPath character varying(200) not null,
 constraint pk_beer primary key (beerID));

create sequence rating_serial;
create table reviewRatingTable
(ratingID int not null default nextval('rating_serial'),
 beerID serial not null,
 userID serial not null,
 titleOfReview varchar(50) not null,
 mainText varchar(500) not null,
 rating integer not null,
 reviewDate varchar(50) not null,
 imgPath character varying(1000),
 constraint pk_reviewRating primary key(ratingID),
 constraint fk_beerTable_beerID foreign key (beerID) references beerTable,
 constraint fk_userTable_userID foreign key (userID) references userTable);

create table breweryBeerTable
(breweryID serial not null,
 beerID serial not null,
 active boolean not null,
 constraint fk_beerTable_beerID foreign key (beerID) references beerTable,
 constraint fk_breweryTable_breweryID foreign key (breweryID) references breweryTable);

create table userFavouriteBrewery
(userID serial,
breweryID serial,
constraint fk_breweryTable_breweryID_2 foreign key (breweryID) references breweryTable,
constraint fk_userTable_userID foreign key (userID) references userTable);

CREATE TABLE image (image_id serial NOT NULL, file_name CHARACTER VARYING(200), mime_type CHARACTER VARYING(100), file_size INTEGER, file_blob BYTEA, active BOOLEAN);


-- drop table if exists app_user;
-- CREATE TABLE app_user (id SERIAL NOT NULL, user_name CHARACTER VARYING(32) NOT NULL, password CHARACTER VARYING(32) NOT NULL, first_name CHARACTER VARYING(32) NOT NULL, last_name CHARACTER VARYING(32) NOT NULL, role CHARACTER VARYING(32) NOT NULL, salt CHARACTER VARYING(255) NOT NULL, profile_image_id bigint ,active BOOLEAN, PRIMARY KEY (id), UNIQUE (user_name));
-- INSERT INTO app_user (user_name, password, first_name, last_name, role, salt, active) VALUES ('test', '6PVA+4+F2VUDxB4+kdrlJQ==', 'david', 'vickars', 'standard', 'jP72xemDanXau65hNc+VruJyG1FGLQjU9JzoVFIn/CLJeT5x/9AkcrIe6cNAciJJiC5ERFy1bZU5gTGdJ+U1eEyGt5mVR8qUN/7KVL7oZyilkdtel11dCl582tWC1qJLmf+SvxITupsbFOGUqkTpW3PJHtBgRoS0HEg4C4SR3Oo=', true);
-- INSERT INTO app_user (user_name, password, first_name, last_name, role, salt, active) VALUES ('rob', 'YmJH+WL8utqsvx2q6aBHZg==', 'rob', 'stewart', 'admin', '5ySh1gZQdL25Zl9CYjLWTt32UC4eBV06IKAE58xW2s29DzlhLdXOTGG3q189PCWjBMzAkTSJ+bfzF/3zwAlmUYFRcHtmzLDwallFRWTUQHJVxszLkLx6u+Ph2eVEwEaLPxOegvOehnx63hjl0qGTm3OA/M4Wwo9o0J2JPIuxCkY=', true);


INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Myles','Chapman-Allen','myles6247@gmail.com','z7kd7Q0Rrl5s4zWa9k7CtQ==','1991-08-05',TRUE,'Admin', 'qI/NYOB7LnMH9g6ZTPTmJTIsTU2AJ9ISNSPxWKBcn6LEC3ac2bgcQkMt6mUNHmX0IoAZXnIle3NrkCGVx/zIuY4qg2hC1Bqr6GyyNtkJ7vfSZlY5h3txP5H/7vmLqF3DijCpAFmyGboIYXcPLGNTPI+PwAR2kFNModsX2jJWnBs=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Chris','McIhargey','chris@gmail.com','8vcnJAozF3VW5lRwmvl4gg==','1972-08-15',TRUE,'Admin', 'zlrAlvib2vwSnTy6IbXeUsdtUpiY4kEBjVFGodaHCDVzKapK+DITfsH1mpi/6V6FpdPOyhPPvpWq+zHFecHTtuIGHb1zgmOXE6UksTphaIoKKl1aldd1/Qk4XKYslMX2cs2F1e87j4kor/sk89oiy9VH4dlaxux2EHd8nFnJSUk=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Shilpa','Hemalatha','shilpa@gmail.com','OswZWnhip5AmT2hvQ7eLZw==','1999-02-22',TRUE,'Admin', 'iSl0NLt+t98cgDjt9CfP4uLtq+QcZt+p0SrNGsxtstmUGv08REg2haAnL28pyY6McOQ/NBbMllU0Dv2a2MUvSH+mBlOBLNixyw/iwbuv2rV1s52TR3DFJh28OqUJUHnq9uRJdAxoEMIHCKWACRoIaFxen+iPY56NFZEPpuxjttM=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Lim','Houwei','lim@gmail.com','c321hhYsqEy9A24AHRjVTA==','1993-08-30',TRUE,'Admin', 'tIO+bi9XVLRh58/0xPatmZJdKxQdQ6d3214NAEfNQOKNur+f2vX7QQBtkjL6WNwPeMGAcIY7LA3u+K3Vln66AnV1tYyAtU5mX+8FKsv9D12JpSz1GSFs9AWCaDlSBBRPT8s1CrjEf8v1N3sNXM7ajG7QuKiGIgRmiM7sOoByE5A=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Kirsty','Thompson','kirsty@gmail.com','tA2gyt0//TqNRPe7LdhVCQ==','1995-05-13',TRUE,'Admin', 'x3kgQQL8sUfOBEcqvmrk2InnhibnUSZJET5yvuWmnwxDc4Eyfco1VzmxH6iRvCy8XaHuDIO/CBRV9WLYRI+NgYh0wuxxOJRSPA7ASMTC+63ioRST85+6wSWEj/IRPAdk2JgW87/K0MI5iNAKlxDE93WuqoS/pPsVqU8t2toXVm4=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Rob','Stewart','rob@gmail.com','kxsiVZ6ur5um9taheFeIrA==','2000-03-17',TRUE,'Brewer', '7ch65kKMV1DHAvGfpUC/Y4Jl2tnfMbSkW0Axt/J8ei9TThn1XgVwc0Ymc6y2Lun37vZ9otvg2SpAbnwQNza9BTYw9s7cc23OSfqdtunqyZUGXIpw6+zdcdeCzuBA9ZGk7tVTYOWjTgoXY7Bxlt+f+FrL+F4GHulbpynFkjNhLhQ=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Kris','Jackson','kris@gmail.com','NZ4fV/k7c+LgZL6Uzd0juA==','2001-05-15',TRUE,'BeerLover', 'qjYK4B5N+2gyiqBtYo+3K4MD5BP9mBl4Orvn6cSrkfsx+f+YzIw2bYKsm8vYXa72I7iW3/lOs7gVSqfoBlHFKl9G8ljebnrt3RHJU0TIvtEL/8kvePXPBuCiDGYURZbW2yU1/5MRWz6GzPOUjZqQFU0Br0deGFAhaN4alcQo7XY=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Runa','Brandt','runa@gmail.com','k88iKxE718scjo4kJjGeWw==','1998-08-12',TRUE,'Brewer', '0xyjNJm5OqPvmGIM/Yli/+1B/1RD/sbkl0XwVd6eD19ex2sJcQ4G6aadqJxBQeG2hZLhksrf1K4PkHh8uMF+1G1EoCWYbQdAtHePp7kg9NKoNgrg+e4YwxidyCmN0YTXz+b6LSK1bmYG44sxDEOORGpwb2jt/1VmVKwncxFgVrI=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Hannes','Van der Merwe','hannes@gmail.com','t4/3cPrwoksbqu9WRAZJng==','1999-03-18',TRUE,'Brewer', '2o/nV8tXN0iUAEb30P4fyCBQmXg3Pqt/2HGMnfMhrdPLEMRCzI+ke1XkUbXOmitl6t1Xk72r8pqK7I+csgCR6kIJsNsOUO5YCbaT5D7kzxuOp8zgw15m6uRETxBEK/bK+lgpKqSrBcjz3uQogrs1XHP32rouSHhzds5UH6z8q1o=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Julie','Hagan','julie@gmail.com','N0rUPXlJS8gBkFgRJkeLKg==','1994-08-01',TRUE,'Brewer', 'txgn8cO9yaP0hZ3QzJm16NF0m0qhTD1X567mStJ6cCPJJw2of7WAd7Ug5fZ6lOfF/cYbBwbkj7wiDv74BSYh4bKqvM6nHILzihu94TX2fW1z6W/ofl+vVGWQKzVOF+uoVNGKdZuip13mKmR8x31l+M7JCUWtoIGPO+I7776Yipw=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('James','Markin','james@gmail.com','ruK7Fw5ZKOkHKr4tZpVaxw==','1996-05-16',TRUE,'Brewer', 'qbpILHw3dd/HcAdX6v6h8lbpUnqegIOpD9GZnFuucs6gCLInOID3aqgIupcEKd28lEzgVQPF8qWe4iKeyVZjnd19MHiwabLWamVB4d7sJr/m0uMeFmocKaq4M63iBN5sMSGc1FXbYjdXH4H3NpsBCg4/7o/OfJ0GoHnP25oqd/g=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Sam','Pryce','sam@gmail.com','vX/+TF0vJYvcvH6orzmCyQ==','1998-09-04',TRUE,'BeerLover', 'AB2Uibxg2MBAnFufVpGy0EKUQE/1SCQ8dM1cFi01eTlK/yCnFCvft48ssza/8rWG45nL//F3+YMiRmYzKzGnvs0Vb0gCNf7xHG02EZE6DJ2p5Ud2dG3pM2RqhpSamzN3T17fIoObTBiyj8Ars9Ijn8Tmtstzx3Jvm4cGZCbaqfw=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Zachary','ODonnell','Zachary@gmail.com','eXdGpTuVhodM5LmbR0+FZw==','1996-04-23',TRUE,'BeerLover', 'TEsaj4pF1/eN/uo3PU/P47Vjm4hkfSeTxF3Mk6ouC4DnvQQt/ICVQMdXMQFs3xkXd23hwbY1tXKoL48T2Hg/l2tf97GuxFAqru9QWOzQIFmrmgTP6IYw0todtcFUMA/dfawfgNkGcZgvsr/9apgzY4YzmpIpydd6d1NalVDihQE=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Umut','Liceli','Umut@gmail.com','KbVZCVQud2XvZDxYSmKmmg==','1991-09-22',TRUE,'BeerLover', 'NunYRD+JkIRK/8lpAeEUzcOLJ+wBAOBbgazMKF3jpvA3lu3UewAKX1tdIzYtXJYwYacI1QvwEf6GwtECD0FMH5RWkb0zh/n8DbQLziKX2fYyi0SG+CpmMBSCSBKD0rfjPP1rUEP2o9z9ML8vT3/Pd3zC794amr/xcKW1S/lXjUk=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Bud','Robertson','Bud@gmail.com','Aytr7IIfYWgnzbmO7aEkJw==','1998-04-09',TRUE,'BeerLover', 'gL+93kFoioi4xPBBFxyUXCWluFY5Sinbp3Ej7sUAObCfH4c2cY3n08Z4BZ8Hqebvim0zjeaMNqiAnh2OG+53b74x3iDl+VRYl9MxIj9eZhZakeZyMZpUkKkaR4cWkh6kQYtfZ8Lmd1Fq2sZ0XxUy5bW0i/SKqHTgYhZqOYiX91o=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Grace','Lam','Grace@gmail.com','a2EPxZm/HzOo0HoFbJzhJg==','1994-12-07',TRUE,'BeerLover', 'wjNYpcjp40S7ACH5L0hH4IpbB4EDKg3gcvGl5ExnrTgFZCong4FfWXQUIPwneDGG888UdT4hQ3Fl0h0UIMa3/oPVMtf80vZ50YfyV+C4K6c5vZdHGD6AguprUDOUPoAZRuQM8ABlSB7xnXlA6cUC5iwA+zjt/PWvr8JfoXay99M=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Craig','McAlister','Craig@gmail.com','wU2qvKTYu6nLPErSEFqZCg==','1992-04-15',TRUE,'BeerLover', 'nnMvlymCHjyl7plXhcIYXQyeA/OtBLpmlOGyKT9qRvJMJTT550RRkqqBgpC1iO3HYMkoJluwu0xSD7/ZqAyKBpYG4a9tLsJKH0ok7eCrNmpUDJeCfuIq3+UYlzXv82oTuH/XVK1YImFpwooVQG+d5OMJ0gbQy+1m7ixnUfXvz8w=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Jonathan','Cho','Jonathan@gmail.com','KImHMEnWxN7wy+fxd0uKHw==','1996-09-25',TRUE,'BeerLover', 'xV7dtwDU7yytIrhbprhzUzDWLfvRibWgsMgKjkLgR0Kp0PrNaqPbYWA1c4KCUG08XpWXtYtI+0xqO35HH5VUW8nUw1Z2wG1Xxp84qca/KeQb32tBsB5L7W1vqhAcDDH1ZRdxlMDh+BHXaCJyE3eYeGCIeMQwMVWpfeSJjnZ8SBo=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Rikki','Ocampos','Rikki@gmail.com','w1JJr3eJo3k+011yB2ngzg==','1995-04-13',TRUE,'BeerLover', 'QR0Hi+zIVJg1Rs1T+Q4p6MsXVY61AnDIRUONqc17WEF3f9gAH/7ztVsIDiCwftW0+pFLpVRjkbkqpu9UR0An39rePLsi7wVgE0WP/M4VO+9VFdEmjXf1Fnlpe/0R5/9pPdIc8XdMxX+4RHagltFjlDyLs1ZG9jSb9tQpwEJDyO0=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Christopher','wright','Christopher@gmail.com','T24AS+B8ZdFKefn8fBPnYA==','1997-11-11',TRUE,'BeerLover', 'qZprZfyrv5kIHeRunqSmL55gkQgxtpQ/6ZMo/XTZY25IYSVUfIE5CncceC1r2xY42tVY+90NtKlCqMlgw6kJSpLNn93JVX3qqecwB03AUekslQ5x09YtaQaBb8AKOvAQvjzluL4PAyYu3ReaUcQ+IBNUouK7G/oeUjKvZDfdhaE=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Mara','Llie','Mara@gmail.com','SwXrhwsjKhxGWfLARhEOdA==','2001-11-22',TRUE,'BeerLover', 'hgt7thVYPsIEH/G7FCFkD2StIh0r40hD24DpkCBUFqSzZHEIzNkf8JarEKat4UpwiehyrhaJo6X/0JQpIkSMW4eh2uiQZiIC09iq2zz83SSdm2fDUjcvAH+C6cSflyirxKEfNIwnyj3b9aWlST2/hRJYdM0B0WYCYI4BEdkX+mQ=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Pret','Shah','preet@gmail.com','GRNxml/Pkp+2vivEHxabvQ==','1985-03-14',TRUE,'BeerLover', 'CuHYrBVk8cStSi9foTFCm5esoivsUUe+M8IJqY7ujrqz+PQo6STaoNJ4UUDy7/pMKnwvWxkJt85kxwABQVts8SboKsydb/43TlW/OUKagd16aTYDgTlURJgCT/sAEU2Zl4R+3TrfURkL7PS4zD0PwXMzEQd9NexSiYbQ6y6Gdek=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Andrew','Mullen','andrew@gmail.com','pRrA+qbo7gXNMBVR8kvkAA==','1987-08-17',TRUE,'BeerLover', '4EgK734uK1sOc38g4CyiYBQik6T0Gc1OAfi/VV/zUBslReutnWaXXKGhE1zCX+5dQQ8UJbyOoXi9mgxnxv0tkMsR8j0FJi1Wee/JAQNUl3Jd79P9pF8TWY1wWoFUJRh1PnrpIcvDWtB8OeXUsDgh8+XtvY13BelzEcXPeli/RpU=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('May','McGonnigle','may@gmail.com','+wvMJ0GhiPEOw0g0zB7iAg==','1995-03-14',TRUE,'BeerLover', '2lB49fiocfzTc+Vf0UaW+erLJk63JUiPM8Zo5dYSOa9HQwfpHGfPLqNySS5Eys/0Z5tQ5+YXZJRtHertJvG8PiTiePYtaVSINJT20jHwhEIUE+vPfnwC+1EDc+NAvqLdZ1d4tll8cJZPxpgnTo1LqSuELtf49bhNYOROqAVwe54=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Shamaila','Razaq','Shamaila@gmail.com','u2piPWRkBUj+wqwo5RNtlA==','1993-05-18',TRUE,'BeerLover', 'lX5RoBmNOsCV1f996oiTi9K4htQf6Ph/VIssW4CAGlFuT0/ce5mMnZ8coK/i4Sp6AUDvnjZ5fi4c6PHoga2+sLPp9GX80Iy/R2LtBCzEtZ71jvr0A4SrNydwFJkG4Nd/3BulQL7R5WM89V5c1Ousvqgeo1XIxDNzUAyuin76ZUM=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Midhuna','Karpak','Midhuna@gmail.com','6wtLcdqmKGHpjnHsCFyTCA==','1994-04-20',TRUE,'BeerLover', 'APAyNLPrPsK0M5kC2cygFBqzQeSg8je6UwR9+PKCUBVcsJ3Ab/6HL6a/8I70cCeEdXli4P9+SVFTlqtWgbJANZdS4ZZ892AIvu52KaR8QGsLDoEfN2Fhy4NT0L5SN0IMVWCK5dWnKV4rXkiPiv/Aw6Tu097tOGVR9zncifOLP/4=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Kritika','Nagar','Kritika@gmail.com','rXPgf9sG86skRgGnJreXJQ==','1992-08-19',TRUE,'BeerLover', '9Z2j8v9XBD85tH5kDVONAthF+kksGZyJC2WhlPxiG75XBB0Sjt6UbF/Exp3gJeqNT/sGTg5QFZreVWHsKKyt9Ef+kVawj/CVk3/baq8AnSwENZjT4JmZ+lL2VWew4SOSDCjCF8qpCRPne3Y5w10CIAHYlLKFeivEr3+fU4Dm99U=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Kaori','Kurokawa','Kaori@gmail.com','SySMGis+toeB6At0kaHzDw==','1989-12-24',TRUE,'BeerLover', 'jLiCnDvaS6WdIz1FB/K8KEdQ+y/bvG6SEMO7x9Q/L2g7pYL1fBuep1GVp8wwOVbckJwPY0eGg54E43+1IG6QKuqYv9ERCvMTp50SUGlWebVlGbcZsHZXIAoTSUb6QTr903Tw0vTQXaGhg9qwilOK01R9ppqKTKaeY8eV5Q/iV10=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog1','brewdog1@gmail.com','C3XXi0WIougsOvTIQMFEWQ==','1979-04-13',TRUE,'Brewer', 'JaduaHdjvpH0o57C0SzwTTyFsaK0iFKctdKeT1jXiCUW/IzXkpZ9AdtxeJqavQvOQYV6bbE+JhERPtpLkuG7zDI5O9XAfUeB8e6b/EM5onsq3TMFcYUSUitGsJ2+zjfHMDxhnxNZ41cS/aVnr2/vmOfp9UWBgaNYq0swhodzPjs=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog2','brewdog2@gmail.com','gDw5ZKFJ7lpdmcQEQpnyMQ==','1995-05-22',TRUE,'Brewer', 'N0evFzHJPJoi9YLNCgmXe2lsS7rx68/eL/H+VyhcSn2HXyHSqMBa4BbKyffaSPXqBVON5dVDXxEj/LEj3Zxn4/Rn0AuM1LVSYrNlsbazfP+AeOdSD+qGf7wGwMPXBnx9fB+gCAgYj8FJBWSsWQz91CAWPiP/MTVSVDDk8ai5V1U=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog3','brewdog3@gmail.com','O6YJ5AdIFH1z/L/PrZ8Zug==','1999-12-12',TRUE,'Brewer', 'tDsqhid9tK5lvg6YhxQfR5Rv7t8dqdiWWWTnafbiPPgTXVpcebR8xHvDagbxsni7uQni3VlQtsmaNYOcQlLZFiAA7Y1mG3XJVZYibp6Q0DRNZK9f4BCiMvnDeec0bH2KO+ez67fVDFDbp2OmjO1F7a4RqnW94LHekqnbGykOo/8=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog4','brewdog4@gmail.com','GvNMf/nGDCoSpBMpu9X0Xg==','1979-03-08',TRUE,'Brewer', 'Sb+x9U/ZbXMxngzPUOlQHfVKH9wdMnqdmKMp0LpI2ParLvzF8M7+uT85dsPGOSlpI61Bmm6wRHd+1dPlCjMV0uT5iYXs5yHcH9hQx3Bh9e30kHe2b5ZYpwsDHhoixkOp6bSPTI32FPCj9f0/sDYQC2ZB1VHmNgbI4NJkH6rwve4=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog5','brewdog5@gmail.com','RyNA/PV26GiMLHuM1g5DlA==','1980-11-13',TRUE,'Brewer', 'l7LGOa+LE78TD56+909qMw///T+GIDET3wn8hXDZMWifmtB2BVcAFN/sEFZqFpuIbbRfz9Gz8nGP91hbARGbZ74F5YDqxDnNkf9gFZXJsZT4avtBO2ZtaPVrP2EzunTUsWClVZnvdIe1MB0+HD2eeX/nOB4jl3TQrf9CD/bJyvA=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog6','brewdog6@gmail.com','4ywWT2ADuQsDIIt8oVCT+g==','1999-02-14',TRUE,'Brewer', 'PjIy0g6mNVkHBTiVI8Kx4v3f6++l5UEzIWQ+KbeXM3nFW/Yra7RZnV4P7fDecnc0OcJTf6xuBlz11AiiBHblDgZ8tfC24oS1W1K6iTMG8Rw3BanBhZUmU7ksLAlmNEVQBlqoU0AZ9/w/vbG0/zkHoXucTzk50ueiCF3CCIolh2A=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog7','brewdog7@gmail.com','7Ft96ksUu2a4eEjgW6HhLA==','1995-06-21',TRUE,'Brewer', 'YWAICkeW0PphdTiH+WcdJFx65QtGZQHppG2mo1Ag4AS1Av2yAUzehZfJYOH85/H7lJfvQ08fY77Hrd6pWhOdX/evUgqLfpEW0zpBxrM0TRRaOI6APoIn+qVwamRcSXIvbJYB6A95rd2QeROn9vtZNJqou6ntRM2vULa6IqsrJjc=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog8','brewdog8@gmail.com','S0o40cIZw+NmKG3E3iNmvQ==','1996-07-30',TRUE,'Brewer', '8jmUEpR52hSvr9dFLwMCi17/RaWKkustEboIQiQaDRwW2559KKjMvMhB4PoGOeFNoVf7u/lvZcfPkM1HEHRfU+YW8rJNotJOyAgxAAh7ON3RoI0H1WrHW9ww4hEudSNVVqKfhO6q5z+B+QjtEasEcjiccYUEHDsyxhXQQx8uzdA=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog9','brewdog9@gmail.com','RdsKoT8A9xKsF7Blaqmwkw==','1997-02-25',TRUE,'Brewer', '8DxwwIVlwfQigoTAfxv4QxYse3l1SKkqukoaGCRhz4iTKIuAK2uuby6deg3mUp+J6U7G2oBIYczet8YYFNPEqdCQWj1IFS8xFENlAvlGdDR6RkNclDIX6RrTqNnUL2JeNDzlmwWoShCvJoSG6lkQzWDQCR2L7bEptT2UFwF13UU=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog10','brewdog10@gmail.com','XGijD5IVAl95lQDsvN6xJg==','1994-03-12',TRUE,'Brewer', 'OYWYpcE/D1JmJ73cgVSWTJR+LPOmjyj4yQzs6Ef5n/xrO7LmS0Y3LprT+UtHxOLHgdjkZBrbOHJ0JxtW94s8auPHUqQ1ZfVbP1dgdkQ1zl01DXhBvB+FMYL87oyGRkcpFM5q5K8ychWgncuw1b16rfpEFo3Xjk7bqwvkJitnVuc=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog11','brewdog11@gmail.com','UaoPMcl7+8Rr7e108oApww==','1993-02-09',TRUE,'Brewer', '1jGGVlYWxKdHdZ1bL6RVWZZ9QAxMC3/wGiZ3fZEMZiStz99MC1mn5DfutRMV/SDnCgXTWJ+ioJxltmMwk8SF4klsF2nJGPHUrDFfGcgH9CpBJjPHeS6MfVIRceSbwzcRoi6MU1BCK27gyUpbKhT8nBywHM5Km1V6Z3DAjgE1e24=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog12','brewdog12@gmail.com','QRsT42QSNZIU8y7NXX4K4Q==','1989-01-22',TRUE,'Brewer', 'qlmxd51PTozRXjmJfwnTt01HAgGdAPzRXURXZW4OHmoPGS0aR0x15IzXfjZV3f2sr/D7vKNczTYc9LbIZ6WOxPzuJXObA5gbJFn30hz/uA9wvEGhwjGl+HL34HObY4ALnPMdkLTVRWdoJsWBFxoc+J5WPdbpoi7lYCmTmCzt40c=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog13','brewdog13@gmail.com','2J5PEHpPLpIIQrhlatzwLw==','1993-03-21',TRUE,'Brewer', 'MrSucjBRmVc80OPkj8Paw0ChzhmTjk/XHx/ZhUWw1AKMdPoXQ3OoS/XPBbAU3Td/ZIqYOj7LQAA4QDYO2eqWJSgPEAzM9AQdlchT6vG2e1NeGnrfFK2ata66dgpJIEkvyuKjx33D3E9VyL1Kmf1BWrSa5dgccg3IJWQxL+QI6mM=');
INSERT INTO usertable (firstname, lastname, user_name, password, dateofbirth, active, role, salt) VALUES ('Brew','Dog15','brewdog15@gmail.com','peIx9FAWZ9OrtBq0wTkMGQ==','1995-07-13',TRUE,'Brewer', 'lVDpsfLyvjW5fIJtmI+GUihbpUg8bSmWd3EKcmnXFJBNNQSmdfLpwGgsDrkPGaQZB+EB0lpMXmK1MGF4e0wUx4yEhLWIvnWIGblOycXouav+BTnWAAanrpKpkUm/FnTOMPdB9BLbDSvKEgOrE4SEfLM+G8TpkyRA0i/bkylqo4Y=');


INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (6,'Southwark Brewing Company','02033024190','46 Druid Street, SE1 2EZ','Thirty years in the making and one of the oldest pioneer breweries in London, Southwark Brewing Company is one of the most popular taprooms on the mile, likely as a result of its crowd-pleasing core range and their close proximity to the ever popular Maltby Street Market (they even encourage you to get your food from the market first and then enjoy in the taproom).','17:00 - 22:00','12:00 - 19:00','https://static.wixstatic.com/media/d6675b_a1d33bb3d4644aa7bfaec29fe44074dd~mv2.png',TRUE,51.5005941,-0.0771444);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (8,'The London Beer Factory ??? Barrel Project','02073946763','80 Druid Street, SE1 2HQ','A serious contender for the best looking taproom on the Bermondsey Beer Mile, with their incredible beer-barrel interior (and their beer selection is pretty epic too).','16:00 - 23:00','11:00 - 23:00','https://matchpint-cdn.matchpint.cloud/shared/img/pub/16424/5bdc6e7b96926_original.jpeg',TRUE,51.4994717,-0.0748793);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (9,'Hawkes Cidery & Taproom','02039038387','86-92 Druid Street, SE1 2HQ','And now for something a little different on the Bermondsey Beer Mile ??? cider! One of the coolest interiors (more mean and moody than dark and dingy), this taproom has bags of character ??? even the branding reminds us a little of Beavertown in its early days.','17:00 - 23:00','12:00 - 23:00','https://whatpub-new.s3.eu-west-1.amazonaws.com/images/pubs/800x600%402x/SEL-13601-126777-hawkes-cidery-taproom-london.jpg',TRUE,51.4993771,-0.0747406);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (10,'Billy Franks Jerky and Craft Beer & Snack Shack','02072376848','104 Druid St, London SE1 2HQ','A house of hops for a jerky manufacturer who then got into a beer, Billy Frank???s Snack Shack is a juicy love in of beef jerky snacks and craft beers, in the shadow of Maltby Street Market and close by to Hiver (we are hoping for a jerky honey combo very shortly!).','17:00 - 23:00','12:00 - 23:00','https://www.beerguideldn.com/images/billyfrankscraftbeerandsn/sized/2021-06-05%2016.41.19.jpg',TRUE,51.4992174,-0.0744851);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (11,'Hiverquarters Taproom & Shop','02031989972','56 Stanworth Street, SE1 3NY','Aside from tackling the Bermondsey Beer Mile, we???ve been regular visitors to Hiver Beer after discovering it was located right next to the incredible food paradise Maltby Street Market. After stuffing our faces with sublime street food, we often beat a retreat to Hiver to enjoy a beer (or three).','16:00 - 23:00','11:00 - 19:00','https://774707.smushcdn.com/2099320/wp-content/uploads/2020/11/007A9924-1-1024x687.jpg?lossy=0&strip=1&webp=1',TRUE,51.4988354,-0.0746673);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (29,'Anspach & Hobday Brewery','02086179510','118 Druid Street, SE1 2HH','Underneath the arches, Anspach and Hobday is a compact taproom in the thick of the brewing vats, although most brewing is done at their new Croydon brewery.','17:00 - 23:00','12:00 - 23:00','https://images.squarespace-cdn.com/content/v1/5b238a149f8770a79bf32145/10ec26ea-ef6e-4f90-afdb-0c435dedd9b0/London+Black+Pint+with+badge.jpg?format=1500w',TRUE,51.4986198,-0.0734285);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (30,'Cloudwater Brew Co','01616615943','73 Enid Street, SE16 3RA','Originally brewed in Manchester, Cloudwater now also has a railway arch taproom in London with around 20 different seasonal and core lines on tap.','16:00 - 21:00','16:00 - 22:00','https://i.ticketweb.com//i/00/11/27/57/19_Edp.jpg?v=5',TRUE,51.4977496,-0.0726903);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (31,'Brew By Numbers / BBNO Taproom and Tasting','02072379794','75 Enid Street, SE16 3RA','Due to its popularity, BBNO has now expanded to have both a taproom and tasting room just a few doors down from each other. The brewery itself is located in the taproom but both have bars with around 8 to 10 core and guest lines on.','16:00 - 22:00','17:00 - 20:00','https://cdn.shopify.com/s/files/1/0070/8050/9498/files/today_2.jpg?v=1596138183',TRUE,51.4976117,-0.0724164);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (32,'London Calling Sweden','02073213666','72 Enid Street, SE16 3RA','Just up the road from the aforementioned Moor taproom, we love London Calling Sweden, mainly for their quirky interiors and unique cider range. As the name suggests, the difference here is that their core range is the Swedish craft beer Poppels, Sweden???s number 1 ???ecological brewery??? (presumably good!).','17:00 - 22:30','12:00 - 22:30','https://www.beerguideldn.com/images/londoncallingsweden/sized/2019-05-26%2014.35.05b.jpg',FALSE,51.4977919,-0.0727825);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (33,'Moor Beer Co Vaults & Tap Room','02039525456','71 Enid Street, SE16 3RA','Whilst not the most grand of taprooms, they more than make up for it with their chirpy staff, burgeoning beer range, plus their cheap as taproom tray taster ??? just ??5 for 4 beers from their core line. We *think* this might be the best value craft beer tray taster we???ve seen anywhere in London and definitely encourages you to ???Drink Moor Beer???.','15:00 - 22:30','12:00 - 22:30','https://www.beerguideldn.com/images/moorbeercovaultstaproom/sized/2018-04-07%2011.19.16.jpg',TRUE,51.4978487,-0.0728843);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (34,'Bianca Road Brew Co','02032211001','83-84 Enid Street, SE16 3RA','They have all the usual beery goodness like IPA, APA and lager but also some of the more interesting craft concoctions like Salt Lake Shake, which is a Ginger and Cinnamon Milkshake IPA, plus their Blood Orange IPA (???LA Bloods???) is also worth a taste. We paid around ??7 for two half pints from their core range. Bonus points too for Bianca Road Brew Co???s wall posters and artwork.','16:00 - 22:00','16:00 - 23:00','https://headbox-media.imgix.net/uploads/space_photo/filename/43295/IMG-9910.jpg?auto=compress,format',TRUE,51.4973931,-0.0720002);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (35,'Craft Beer Junction','07916126841','86 Enid Street, Bermondsey','One of the newest additions to the Bermondsey Beer Mile, Craft Beer Junction is actually a wholesaler / supplier that has branched out an open its own cosy taproom on Enid Street, with one of the biggest beer selections in Bermondsey','16:30 - 23:00','14:00 - 23:00','https://whatpub-new.s3.eu-west-1.amazonaws.com/images/pubs/800x600%402x/SEL-13677-124965-craft-beer-junction-bermondsey-east.jpg',TRUE,51.4972722,-0.0717603);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (36,'The Kernel Brewery','02072314516','Arch 11, Dockley Road, SE16 3SF','We are ???nuts??? about the Kernel Brewery but where do we start with this ultra modern and sleek taproom? Maybe with the uber friendly staff, who offered their recommendations','15:00 - 22:00','12:00 - 21:00','https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/The_Kernel_Imperial_Brown_Stout_%28cropped%29.jpg/1024px-The_Kernel_Imperial_Brown_Stout_%28cropped%29.jpg',TRUE,51.4955659,-0.0688327);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (37,'Affinity Brewing Company','07525167925','7 Almond Road, SE16 3LR','We liked our visit to the Affinity Taproom as not only have they created a cracking craft range, they???ve also made their bar very warm and welcoming, with an added bonus in the shape of an amazing mezzanine level consisting of comfy sofas and long tables.','17:00 - 20:30','12:00 - 20:30','https://affinitybrewco.com/____impro/1/onewebmedia/AFFINITYGROSVENORLIGHTSweb.jpg?etag=%2213ca5-616c3cbc%22&sourceContentType=image%2Fjpeg&quality=85',FALSE,51.4917504,-0.0596301);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (38,' The Outpost ??? Three Hills Brewing','02080504985','7 Almond Rd, London SE16 3LR','Originally from Northampton and founded back in 2017, Three Hills Brewery opened their Bermondsey outpost in 2020, specialising in small batches and a regular rotation meaning every time you visit, you???ll likely be in for a new surprise.','16:00 - 23:00','13:00 - 23:00','https://www.beerguideldn.com/images/threehills-theoutpost/sized/2021-06-05%2015.18.45.jpg',TRUE,51.4917504,-0.0596301);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (39,'Spartan Brewery','02076534783','8 Almond Road, SE16 3LR','Small in scale (living up to their name) but with bags of enthusiasm, this is possibly the tiniest taproom on the Mile and only open on Saturdays.','16:00 - 21:00','13:00 - 20:00','https://www.beerguideldn.com/images/spartantaproom/sized/2021-06-05%2015.51.34.jpg',TRUE,51.4917029,-0.0595252);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (40,'EeBria','02087629576','15 Almond Road, SE16 3LR','More of a bottle-shop than an actual brewery, Eebria is a distributor who open up their downstairs bar every Saturday (and Fridays in summer).','17:00 - 21:00','12:00 - 20:00','https://www.beerguideldn.com/images/eebriataproom/sized/2017-11-11%2012.09.59.jpg',TRUE,51.4913821,-0.0587851);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (41,'Partizan Brewing','02081275053','34 Raymouth Road, SE16 2DB','A little more of the beaten (beer) track and with no nearby ???craft??? competitors, Partizan is well worth seeking out. Whilst a little quieter when we visited compared to most other Bermondsey Beer Mile breweries (likely due to its location), the experience feels more genuine and they also purvey what appear to be the funkiest beer taps which look like toys.','17:00 - 22:00','12:00 - 20:00','https://www.beerguideldn.com/images/partizanbrewing/sized/2017-11-11%2011.32.13.jpg',TRUE,51.4912565,-0.0574717);
INSERT INTO brewerytable (userid, breweryName, breweryPhoneNum, breweryAddress, breweryHistory, openingHoursMonThur, openingHoursFriSun, imgPath, active, latitude, longitude) VALUES (42,'Fourpure Brewing Co. Basecamp','02037442141','22 Rotherhithe New Road, SE16 3LL','Probably our favourite overall taproom experience on the Bermondsey Beer Mile in terms of the venue itself is Fourpure. Whilst less ???personal??? than other taprooms on the Beer Mile (due to its huge size and massive throughflow of drinkers), this is a ???new??? taproom, opened in summer 2019 on an unassuming industrial estate.','16:00 - 22:00','12:00 - 20:00','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f6/76/49/fourpure-taproom.jpg?w=1200&h=1200&s=1',TRUE,51.491066,-0.0513451);


INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('London Pale Ale','Modern style easy drinking Pale Ale, brewed in the shadow of the Shard, with light malt textures, subtle bitterness and wonderful citrus and tropical tones and a powerful aftertaste.','Malts, Pale Ale','4',TRUE,'https://cdn.diffords.com/contrib/bws/2017/10/59dba0d7cf2cf.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Bermondsey Best','Traditional English Best Bitter with the finest English ingredients, East Kent Goldings from the garden of England, produce a superbly balanced chestnut beer, with hints of caramel shortbread flavour and wonderful lavender, spice and honey hoppiness.','Malts, Pale Ale, Medium Crystal, Red X, Amber','4.4',TRUE,'https://cdn.diffords.com/contrib/bws/2017/10/59dba0dac0cb9.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Potters Field Porter','A traditional session London Porter based on an old recipe using English Pale, Crystal and Chocolate Malts, Fuggles and Goldings Hops. These produce a dark beer with malty body and bitterness balanced with a hint of coffee and liquorice.','Malts, Pale Ale, Cara Aromatic, Oat Malt, Chocolate Malt','4',TRUE,'https://media.eebriatrade.com/media/products/33090/20210105164447046/450x450.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Mayflower Session IPA','Lightly coloured easy drinking pale ale with a hit of hops - all the hoppiness without the alcohol, a true session ale. Brewed to commemorate the voyage of the Mayflower with the Pilgrim Fathers to America in 1620, a journey that started in Rotherhithe, not Plymouth!','Malts, Pale Ale, Oat Malt, Torrefied Wheat','4.2',TRUE,'https://media.eebriatrade.com/media/products/31542/20201102123237076/450x450.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Harvard American Pale Ale','A highly-hopped American Pale Ale brewed with English Malt giving a golden colour. Four American hops are added at various stages of the brew to produce an intense hoppiness balanced with a fresh bitter aftertaste and citrus and floral overtones.','Malts, Pale Ale, Medium Crystal','5.5',TRUE,'https://media.eebriatrade.com/media/products/31541/20201102123031355/450x450.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Bright Side ','A super refreshing lager, brewed using traditional German malts and hops, one to enjoy with your mates and look on the bright side of life!','Lager','4.8',TRUE,'https://www.thelondonbeerfactory.com/wp-content/uploads/2021/10/Brightside_Online_shop_can.png');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Day Dreamer','Day Dreamer, our New England Session IPA packed full of tropical and stone fruit flavours. A naturally hazy beer, juicy and super sessionable ??? it???ll have you day dreaming of the good times!','New England Session IPA ','4.8',TRUE,'https://www.thelondonbeerfactory.com/wp-content/uploads/2022/02/Day_Dreamer_Online_shop_can.png');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Voodoo','Voodoo is a creamy, rich and smooth Irish dry stout. The layered simplicity of the dark, chocolate and roasted malts shine through in this beer to make you believe it???s made using the dark arts!','Voodoo Stout','5',TRUE,'https://www.thelondonbeerfactory.com/wp-content/uploads/2022/02/Voodoo_Online_shop_can.png');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Parasol','Parasol is a dry hopped lager. This is a clean crisp lager dry hopped with H??ll Melon and Mandarina Bavaria which bring those melon and sweet orange citrus flavours.','Dry Hopped Lager','5.4',TRUE,'https://www.thelondonbeerfactory.com/wp-content/uploads/2022/05/Parasol_Online_shop_can.png');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Jungle Trip','Jungle Trip is our smooth, hazy new England pale ale. Full of tropical, citrus and pine flavours which combine with fruity aromas to take you on what can only be described as a jungle trip!','New England Pale Ale','5.3',TRUE,'https://www.thelondonbeerfactory.com/wp-content/uploads/2021/01/Jungle_Trip_Online_shop_can.png');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Urban Orchard','Cider made the right way. Surplus unloved apples pressed in our London Cidery, blending cult classics like the tart as hell Bramley with sweet bombs like Gala and Braeburn. Our upcycled apple cider is perfectly bubbly, with zippy acidity, and banging out a wine-like finish. Stick it in the fridge and sip it chilled.','Cider','4.5',TRUE,'https://www.cavedirect.com/media/catalog/product/cache/3e33e40cc695b8e8fb843fe5efafed69/u/r/urban_orchard.png ');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Dead & Berried','Sweet as a nut. Packed to the rafters with blackberry, raspberry and blueberry, on a brisk dessert apple base, this super fruity cider is fermented with a wine yeast to delicately balance the sweet berry front. Deep, lush, dead drinkable.','Cider','4',TRUE,'https://www.nectar.net/productimages/haw007-jpeg@2x.jpg ');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Pineapple Punch','Pow! Our Kent Bramley & dessert apple blend takes swings at a top-notch contender, the pineapple! Following a 2-week bout in the fermenter, the unlikely pairing brings a barrage of tropical flavour. Zingy, fresh pineapple is tempered with the bright acidity of our London-made cider. Like liquid sunshine. Pair with Ray Bans.','Cider','4',TRUE,'https://www.craftbeer-shop.com/media/image/product/6419/lg/brewdog-hawkes-pieapple-punch.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Utopian British Lager','Our signature Premium British Lager is influenced by the Bavarian Helles style, but just like all Utopian Beers, it has been brewed solely with the finest, British grown malted barley and hops. A slow, low temperature fermentation followed by a long cold conditioning, gives this lager a crisp, clean finish whilst allowing all the wonderful flavours from the malt and hops to fully develop and shine. Light golden in colour, with depth of flavour and impeccable balance, this is lager at its finest','Lager - Helles','4.7',FALSE,'https://d2j6dbq0eux0bg.cloudfront.net/images/31078077/2215096121.jpg');
INSERT INTO beertable (beername, beerdescription, beertype, abv, active,imgPath) VALUES ('Wednesday','2 year barrel aged stout base with hazelnuts & mexican vanilla beans.','Stout - Imperial / Double','12',FALSE,'https://cdn.shopify.com/s/files/1/2097/1379/products/IMG_9143_grande.jpg');



INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (1,7,'Towering Beer!','My co-worker Jack has one of these. He says it looks towering.',4,'09/05/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (2,12,'Beer improves athleticism!!','This Beer works quite well. It pointedly improves my golf by a lot.',5,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (3,13,'Not the best but not the worst!','Colour is amber, hazy. Aroma is nice fruity, orange, grapefruit, caramel, bit roasted onion, tropical fruits. Taste is medium to full malty base, orange, grapefruit, tropical fruits, bit pine, nice balanced harmonic bitterness, medium carbonation, really good, enjoyed for sure.',3,'08/31/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (4,14,'Easy drinking!','Nice apple nose and apple flavor. Overall a very nicely balanced cider. Was one of my favorites during my sampling of the ciders on tap at the Hawkes Cidery & Taproom in London (which isn???t showing up as a location but you can find it on Druid Street!). Overall, this was second only to the All Made Equal. I quite enjoyed it! Went well with the cheese plate and cheese pizza my wife and I shared.',4,'09/01/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (5,15,'Superb',' highly-hopped American Pale Ale brewed with English Malt giving a golden colour. Four American hops are added at various stages of the brew to produce an intense hoppiness balanced with a fresh bitter aftertaste and citrus and floral overtones.',3,'09/02/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (6,16,'Packs a punch','A traditional session London Porter based on an old recipe using English Pale, Crystal and Chocolate Malts, Fuggles and Goldings Hops. These produce a dark beer with malty body and bitterness balanced with a hint of coffee and liquorice.',3,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (7,17,'Full of flavour','Colour is clear cloudy yellow with creamy white head. Aroma is citrus and grass. Taste is light and most lemon flavour. Light bodied with average carobonation.',4,'09/04/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (8,18,'Perfect for the hot weather','Hazy pale pear colour. Some white head. Decent aroma and taste of fresh yellow and green apples, and a hint a hint of pear zest. Very quaffable.',3,'09/05/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (9,19,'Strong and tasty','Low but lasting lufy white head. Hazy dark amber body. Mild slightly acidic oranges aroma and flavor with little hops bitterness, low carbonation and a long bitter finish',4,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (10,20,'Refreshing ','The aroma has grass, hay, apple cores, alcohol notes, pear hints, some cellar and a good dash of fresh apple and some fruity sourish thing',2,'08/31/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (11,21,'Delicious summer drink','Very dark brown with a frothy beige head of modest duration',3,'09/01/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (12,22,'Enjoyable','Dry straw bitter fruity flavor. Nice amount of hops bitterness, low carbination, long bitter finish.',4,'09/02/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (13,23,'Nice and malty','Dark brown beer lasting tan head. Malty rich aroma. smooth in mouth. hides abv well. malty but not overly so. more like malted loaf than anything else. some dark fruit but not too fruity. it''s fine. very drinkable. Good',1,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (14,24,'Lovely lager','Clear yellow golden body. Weak straw aroma with an odd note of perfume. Mild and weak straw flavor with little hops bitterness, low carbonation and a short sweet finish.',5,'09/04/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (15,25,'Out of this world','Can from the Low Cost Beer online shop. Still well in date though. Pours hazy orange with a short-lived thin white head. Aromas of mango, papaya and grapefruit. Taste is pineapple, blueberry, orange. Bitter finish',5,'09/05/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (1,26,'Easy drinking!','Solidly hoppy; pine, citrus, with dry hop evidence in the taste. Not thick or deep. Definitely lower ABV, yet the hop character carries through well in a bittersweet finish.',3,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (2,27,'Superb','Popping the cork was an almost quiet job, suspect it might have been pourly attached. The oxidation level in the beer suggests so too. Toffee, bread, licorice, some piney and flowery hints and some generic fresh and dried fruits. ',5,'08/31/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (3,28,'Packs a punch','Colour is pale gold, hazy. Aroma malty wheat, citrus, banana, herbal, spicy. Taste is light malty base, wheat, banana, citrus touch, floral, decent bitterness, herbal, medium carbonation, ok, not for the style yet drinkable.',2,'09/01/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (4,7,'Full of flavour','It''s a hazy pale copper colored beer with just some off-white bubbles as a head',3,'09/02/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (5,12,'Perfect for the hot weather','Pours clear gold colour lasting white head. light saison aroma. it''s somewhere between a Belgian blond and a saison. some sweetness. ',1,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (6,13,'Strong and tasty','Pours slightly hazy golden amber with a white head. Aroma of malt. Fruity taste. Dry finish.',4,'09/04/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (7,14,'Refreshing ','Aroma has pine, stone fruits, grapefruit, with sweet malts, and some dry hopping. Taste is strongly bittersweet; pine, chewy resin, grapefruit, stone fruits, and light sweet malts. Also tangerine shows. ',5,'09/05/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (8,15,'Delicious summer drink','Lightly hazy pale yellow, small head. Aromatic floral hops meet bready malt up front. Mid sweet with slender body and soft, yet firm mouthfeel. Velvetty malt, bread and lots of floral hops. Close to perfection. Holy hell, this this sublime!',2,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (9,16,'Enjoyable','Taste is quite thin; citrus & candied fruits with light sweet malts. Finishes short. Solid hop blend is completely missing a backbone. Surprising miss',3,'08/31/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (10,17,'Nice and malty','Pours hazy dark yellow with a white head, lacings. Aroma of mild sourness, light malt, sweet fruit, peachy, light white wine. Flavor is light sweet, light tart, little malt, sweet tropical fruit, peach, apricot, light white wine barrel, grapes. Medium body, average carbonation, sweet light tart fruity finish',4,'09/01/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (11,18,'Lovely lager','Pours an unclear old gold with no head. Aroma is fruity with pineapple, guava, and some stone fruit. There are also pale malts, light grain, and a touch of yeast. Taste brings a stronger pineapple/guava meld, with grains. Very little depth does not allow the good components to carry through. Finishes fruity and short. ',2,'09/02/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (12,19,'Out of this world','Aroma has berries, sweet malts, sweet graham crackers, and some cinnamon. Jammy, leaning earthy sweet. Taste is big; tart & earthy berry, sweet malt, cinnamon and spices. Can squint and get pie crust. Maybe some vanilla. Surprisingly sweet. If there is barrel, it is very well integrated. Nice tangy, tart, earthy blend with the sweetness',3,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (13,20,'Easy drinking!','Hazy pour. Aroma has citrus & stone fruits, pale malts, and lemon & lime, with some dry hopping. Taste is not as smooth as expected; citrus, passionfruit, lemon, pale malts, and dry hop evidence. Juicy. Medium bodied',3,'09/04/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (14,21,'Superb','Nice big cherry led nose with sweet malts, and light roast. Taste started a bit cough syrupy, but then the smooth malts, solid cherry, and chocolate & roast showed. ',5,'09/05/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (15,22,'Packs a punch','Aroma of light malt, fruity hops, light peach, mango, citrus. Flavor is light sweet, light malt, fruity hops, citrus. Medium body, average carbonation, light sweet light bitter finish',4,'09/03/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (1,23,'Full of flavour','Clear golden with a fine but lasting, lacing loose white head. Soft citrus and stone fruit aromas. That classic English session golden profile. Delicate malt and earth mid-palate. Light body, soft mouthfeel, gentle marmalade bitterness and a fruity finish.',2,'08/31/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (2,24,'Perfect for the hot weather','Golden clear with no head. Nice sweet-sour cider like aroma. Sweet-sour fruity refreshing taste. Just nice and refreshing.',3,'09/01/2022');
INSERT INTO reviewratingtable (beerid, userid, titleofreview, maintext, rating, reviewdate) VALUES (3,25,'Strong and tasty','Good IPA. A good level of hoppiness, but never acerbic. Some sweetness, a good beer',3,'09/02/2022');


INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (1,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (1,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (1,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (1,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (1,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (2,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (2,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (2,8, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (2,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (2,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (3,13, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (3,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (3,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (3,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (3,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (4,15, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (4,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (4,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (4,12, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (4,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (5,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (5,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (5,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (5,14, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (5,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (6,11, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (6,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (6,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (6,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (6,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (7,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (7,15, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (7,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (7,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (8,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (8,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (8,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (8,14, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (8,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (9,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (9,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (9,13, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (9,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (9,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (10,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (10,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (10,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (10,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (11,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (11,12, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (11,2, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (11,8, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (11,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (12,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (12,11, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (12,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (12,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (12,13, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (13,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (13,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (13,14, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (13,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (13,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (14,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (14,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (14,14, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (14,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (14,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (15,8, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (15,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (15,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (15,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (15,15, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (16,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (16,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (16,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (16,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (16,8, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (17,12, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (17,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (17,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (17,6, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (17,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (18,13, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (18,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (18,1, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (18,9, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (18,7, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,10, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,12, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,3, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,4, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,5, TRUE);
INSERT INTO breweryBeerTable (breweryID, beerID, active) VALUES (19,15, TRUE);

update brewerytable set brewerynews = 'The Taproom is closed between 22nd September and 2nd October, we hope we can welcome you back on Tuesday 3rd!' where breweryid = 1;
update brewerytable set brewerynews = 'Our mobile coolship, the UK???s first purpose built vehicular coolship, travels the UK capturing wild yeast and bacteria that naturally occur all around us - and creating beer from this. Every beer is a living record of the area we visit - and the friends we make along the way.' where breweryid = 2;
update brewerytable set brewerynews = 'PINEAPPLE PUNCH COCKTAIL RECIPES - MAKE YOUR OWN PINEAPPLE PUNCH COCKTAIL THIS WINTER!' where breweryid = 3;
update brewerytable set brewerynews = 'We love jerky but we don???t love all the sugar, salt and preservatives that tend to come with it. So in 2011, we set up making our craft British beef and turkey jerky in our tiny, one bedroom flat in London. As it turns out, we weren???t the only ones looking for responsibly sourced, healthy jerky snacks - our friends, colleagues and family all loved our air dried, wholesome, meaty treats. So Billy Franks was born???' where breweryid = 4;
update brewerytable set brewerynews = 'Hiver was born out of an admiration for Londons urban beekeepers and a passion for craft beer. After the successful launch of our honey blonde beer, it is time for you to try the new honey brown ale.' where breweryid = 5;
update brewerytable set brewerynews = 'For connoisseurs of craft, our classic core range, steeped in tradition, includes some the scene???s most innovative beers.' where breweryid = 6;
update brewerytable set brewerynews = 'At Cloudwater, we champion beer quality through our focus on balance, precision, creativity, and brewing science.' where breweryid = 7;
update brewerytable set brewerynews = 'As well as helping lead the way for hazy East Coast pale ales in the UK, BBNo is also seen as a pioneer on issues such as the importance of freshness, beer cold storage, and continues to be a major influence on taproom culture in London. We are described as an exploratory brewery with a commitment to learning, thoroughness and excellence in whatever we do.' where breweryid = 8;
update brewerytable set brewerynews = 'Taproom on the Beer mile with Swedish beer. We have now temporarily set up a bottleshop/grocery/coffee shop stocking local and Swedish delicacies!' where breweryid = 9;
update brewerytable set brewerynews = 'Our Brewery tour in total take about 1.5-2 hours and include a tutored tasting of our beers. Tours are held regularly at 12.45pm on Saturdays but we can organise tours for group bookings at other times. Please contact us if you wish to enquire' where breweryid = 10;
update brewerytable set brewerynews = 'To us, craft beer is all about trying new things and making sure that the current brew is the best beer we???ve ever made.' where breweryid = 11;
update brewerytable set brewerynews = 'Our selection includes an ever changing range of breweries & meaderies and styles, so there is always something you have not tried before. Swing on in if you are in the neighborhood to try our selection of craft beer & award-winning mead.' where breweryid = 12;
update brewerytable set brewerynews = 'Update: 10.09.2022 The Arch 7 Taproom & Bottle Shop are temporarily closed from Sep 25th September until 7th October due to road resurfacing at the entrance. The Taproom is due to reopen at 3pm on Saturday 8th October.' where breweryid = 13;
update brewerytable set brewerynews = 'We???re a local brewpub with lot of beer and cider taps. Situated between Brixton and Stockwell Tube Stations - Fresh pizza served daily till 10pm' where breweryid = 14;
update brewerytable set brewerynews = 'We???re a local brewpub with lot of beer and cider taps. Situated between Brixton and Stockwell Tube Stations - Fresh pizza served daily till 10pm' where breweryid = 15;
update brewerytable set brewerynews = 'In 2020, we opened ???The Outpost??? brewery w/ taproom on the Bermondsey beer mile. ???The Outpost??? has 20 taps pouring a wide range of drinks including a tank dispensed house saison, nitro-dispensed BPAVK, guest beers, Aperol Spritz & Gin & Tonic. We have both indoor & outdoor seating with pianos, chess & games to play.' where breweryid = 16;
update brewerytable set brewerynews = 'We are open from 17th April! No booking necessary.' where breweryid = 17;
update brewerytable set brewerynews = 'Great drinks are important for bringing people together, and quality is well worth paying for so come and visit us.' where breweryid = 18;
update brewerytable set brewerynews = 'Our beers are for everyone. Easy-drinking, delicious. Think flavour. Think refreshing. That???s us.' where breweryid = 19;

update reviewratingtable set imgpath = 'https://www.drinkinthesights.com/uploads/1/3/0/9/130954401/london-pale-ale-from-meantime-brewing_orig.jpg' where beerid=1 and ratingid =1;
update reviewratingtable set imgpath = 'https://images.immediate.co.uk/production/volatile/sites/2/2018/05/IPA-3b953d4.jpg?quality=90&resize=700,466' where beerid=1 and ratingid =31;
update reviewratingtable set imgpath = 'https://bemedia.azureedge.net/camedia/0013631_cochrane-cowboy-trail-brewery-spirits-tour_260.jpeg' where beerid=1 and ratingid =16;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_08_20/fd1c5d7c5562b49709f3c6fff922484e_640x640.jpg' where beerid=2 and ratingid =2;
update reviewratingtable set imgpath = 'https://www.londonxlondon.com/wp-content/uploads/2020/05/Bermondsey-Mile-10-1024x683.jpeg' where beerid=2 and ratingid =17;

update reviewratingtable set imgpath = 'https://visitmontgomery.com/wp-content/uploads/2020/09/Brewery-Toast.jpg' where beerid=3 and ratingid =3;
update reviewratingtable set imgpath = 'https://pauldav1963.files.wordpress.com/2015/11/p1040693.jpg' where beerid=3 and ratingid =18;
update reviewratingtable set imgpath = 'https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2019/05/18100339/Bermondsey-Beer-Mile.jpg' where beerid=3 and ratingid =33;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_08_31/790b32f0968f97e266c9b40a565ff10e_640x640.jpg' where beerid=4 and ratingid =4;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_08_13/c073c61732cd13b64d157b11963fb4dc_640x640.jpg' where beerid=4 and ratingid =19;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_08_30/1bd27ad6fa93a15e2d0288075eeff8cc_640x640.jpg' where beerid=5 and ratingid =5;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_03/50774e26cbb0518aa432d461875b0f83_raw.jpg' where beerid=5 and ratingid =20;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_07_30/298cc0d312efaa33a57bdddeee61cb2e_640x640.jpg' where beerid=6 and ratingid =6;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_08/ba480fecaed715021e8d8afa6bac6a4a_raw.jpg' where beerid=6 and ratingid =21;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_10/94dcaee4072491a233e283d5ffa0cea6_640x640.jpg' where beerid=7 and ratingid =7;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_07/98c3ca048deaeadbc0fa620013d4b717_640x640.jpg' where beerid=7 and ratingid =22;

update reviewratingtable set imgpath = 'https://images.squarespace-cdn.com/content/v1/59c3feb149fc2b152179e47e/1521837356796-Z8TKSU8UL2G7TK4IKPLF/voodoo-ranger-passion-fruit-ipa-768x432.jpg' where beerid=8 and ratingid =8;
update reviewratingtable set imgpath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiu-xzKLL2EoHCm-PUURPrp2X59cu6NEP7MA&usqp=CAU' where beerid=8 and ratingid =23;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_07_22/fbcaf142660b8f807c145c0af27ffb17_640x640.jpg' where beerid=9 and ratingid =9;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_06_24/33ad5360395bc21bd50044de20020bc1_640x640.jpg' where beerid=9 and ratingid =24;

update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_11/3fbb12d3deab21c11707394e88b0864b_640x640.jpg' where beerid=10 and ratingid =10;
update reviewratingtable set imgpath = 'https://lorenzoeats.files.wordpress.com/2022/01/jungle-trip.jpg?w=1200' where beerid=10 and ratingid =25;

update reviewratingtable set imgpath = 'https://reasonedandseasonedblog.files.wordpress.com/2018/12/IMG_5337.jpg?w=640' where beerid=11 and ratingid =11;
update reviewratingtable set imgpath = 'https://cdn.smokymountains.com/pois/images/Urban-Orchard-Cider-Co-West-5d3aa8947e5ef.jpg' where beerid=11 and ratingid =26;

update reviewratingtable set imgpath = 'https://res.cloudinary.com/abillionveg/image/upload/f_auto,q_auto,w_720/v1614994354/xlxieheqg8zxw6ffiipy.jpg' where beerid=12 and ratingid =12;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_12/abcc5bfc936f29a5faa959e9c7d25de6_640x640.jpg' where beerid=12 and ratingid =27;

update reviewratingtable set imgpath = 'https://d1onh8pwvkaf3n.cloudfront.net/beer_tick_images/1646564997-32-344077.jpg' where beerid=13 and ratingid =13;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photo/2022_09_10/9d899a8f53c6ae2e7efd772f8d4382ca_c_1200481224_640x640.jpg' where beerid=13 and ratingid =28;

update reviewratingtable set imgpath = 'https://bacchanalian.co.uk/wp-content/uploads/2020/06/british-lager.png' where beerid=14 and ratingid =14;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_11/3ea27d9a7b31e77542da9e3a6e1a7c9d_640x640.jpg' where beerid=14 and ratingid =29;

update reviewratingtable set imgpath = 'https://imengine.prod.srp.navigacloud.com/?uuid=2e1035e5-61b6-5c6b-8b31-62761aeb3c1d&type=primary&q=72&width=1024' where beerid=15 and ratingid =15;
update reviewratingtable set imgpath = 'https://assets.untappd.com/photos/2022_09_07/0f7b435991cd6507c59d3c52a600b2eb_640x640.jpg' where beerid=15 and ratingid =30;

commit;