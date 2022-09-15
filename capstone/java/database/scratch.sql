select * from reviewratingtable;

select * from beertable;

select * from brewerybeertable;

select * from brewerytable;

select * from usertable;







































select * from app_user;
select * from person;

update app_user set role='admin' where user_name='rob';
update app_user set role='standard' where user_name='rob';

select
    m.*,
    p.person_name as director_name
from
    movie m
    left join person p
        on p.person_id = m.director_id
where
        (
          m.title ilike :search
          or
          m.overview ilike :search
        )
        and
        (
          m.length_minutes between :minLength and :maxLength
        );


--
-- select
--         p.*
--     from
--     person p
--     join movie_actor ma
--         on p.person_id = ma.actor_id;
-- where
--     p.person_name ilike :name
-- order by p.person_name



select
    m.*,
    p.person_name as director_name
from
    movie m
        left join person p
                  on p.person_id = m.director_id
where
    m.movie_id =  1;



update app_user
set
    first_name=:first_name,
    last_name=:last_name,
    role=:role
where
    id=:id;

update app_user
set
    password = :password,
    salt = :salt
where
    user_name = :username;



update movie
    set
        overview = :overview
    where
        movie_id = :id;


select
    i.*
from
    image i;