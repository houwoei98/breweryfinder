package com.purple.dao;

import javax.sql.DataSource;

import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.model.UserSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class UserDaoJdbc implements UserDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public UserDaoJdbc(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public User saveUser(User user) {
        String sql = (user.getId() > 0) ?
                "update usertable set " +
                        " firstname=:first_name, " +
                        " lastname=:last_name, " +
                        //" role=:role, " +
//					" profile_image_id=:profile_image_id " +
                        " where userid=:id;"
                :
                "insert into usertable" +
                        " (user_name, password, firstname, lastname, role, salt, dateofbirth, active) " +
                        " values " +
                        " (:user_name, :password, :first_name, :last_name, :role,  :salt, :dateofbirth, true)" +
                        " returning userid;";

        Map<String, Object> params = new HashMap<>();
        params.put("id", user.getId());
        params.put("user_name", user.getUserName());
        params.put("password", user.getPassword());
        params.put("first_name", user.getFirstName());
        params.put("last_name", user.getLastName());
        params.put("dateofbirth", user.getDateOfBirth());
        params.put("role", user.getRoleString());
        params.put("salt", user.getSalt());
//		params.put("profile_image_id",user.getProfileImageId());
        if (user.getId() == 0) {
            Long id = jdbcTemplate.queryForObject(sql, params, Long.class);
            return getUserById(id);
        } else {
            jdbcTemplate.update(sql, params);
        }
        return getUserById(user.getId());
    }

    @Override
    public void updatePassword(String userName, String password, String salt) {
        String sql = """
                update usertable
                set
                    password = :password,
                    salt = :salt
                where
                    user_name = :username;""";
        Map<String, Object> params = new HashMap<>();
        params.put("user_name", userName);
        params.put("password", password);
        params.put("salt", salt);
        jdbcTemplate.update(sql, params);
    }

    @Override
    public void deleteUser(long id) {
        String sql = "delete from reviewratingtable where userid = :userid;\n" +
                "delete from brewerybeertable where breweryid = (select breweryid from breweryTable where userid = :userid);\n" +
                "delete from brewerytable where userid = :userid;\n" +
                "delete from usertable where userid = :userid;";
        Map<String, Object> params = new HashMap<>();
        params.put("userid", id);
        jdbcTemplate.update(sql, params);
    }

    @Override
    public void deleteBrewery(long id) {
        String sql = "delete from brewerybeertable where breweryid = :breweryid;\n" +
                "delete from brewerytable where breweryid = :breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", id);
        jdbcTemplate.update(sql, params);
    }

    @Override
    public User getUserByUserName(String userName, boolean returnPassword) {
        String sqlSearchForUsername = "select * " +
                " from usertable " +
                " where upper(user_name) = :username  and active=true";
        Map<String, Object> params = new HashMap<>();
        params.put("username", userName.toUpperCase());
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sqlSearchForUsername, params);
        if (rowSet.next()) {
            return mapUserFromRowSet(rowSet, returnPassword);
        }

        return null;
    }

    @Override
    public User getUserById(Long id) {
        String sqlSearchForUsername = "select * " +
                " from usertable " +
                " where userid = :id and active=true;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sqlSearchForUsername, params);
        if (rowSet.next()) {
            return mapUserFromRowSet(rowSet, true);
        }
        return null;
    }

    @Override
    public List<User> getUsers(User currentUser, UserSearchCriteria searchCriteria) {
        String sql = "select * " +
                " from usertable " +
                " where  active=true " +
                " and (" +
                " firstname ilike :name " +
                " or " +
                " lastname ilike :name " +
                " ) ;";
        Map<String, Object> params = new HashMap<>();
        params.put("name", searchCriteria.getName());
        //params.put("groupname",searchCriteria.getGroupName());
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, params);
        return mapUsersFromRowSets(rowSet, false);
    }

    private List<User> mapUsersFromRowSets(SqlRowSet results, boolean returnPassword) {
        List<User> users = new ArrayList<>();
        while (results.next()) {
            users.add(mapUserFromRowSet(results, returnPassword));
        }
        return users;
    }

    private User mapUserFromRowSet(SqlRowSet results, boolean returnPassword) {
        User thisUser;
        thisUser = new User();
        thisUser.setId(results.getLong("userid"));
        thisUser.setUserName(results.getString("user_name"));
        thisUser.setPassword(results.getString("password"));
        thisUser.setFirstName(results.getString("firstname"));
        thisUser.setLastName(results.getString("lastname"));
		thisUser.setDateOfBirth(results.getString("dateofbirth"));
        thisUser.setRole(User.UserRole.fromString(results.getString("role")));
        thisUser.setActive(results.getBoolean("active"));


        if (returnPassword) {
            thisUser.setPassword(results.getString("password"));
            thisUser.setSalt(results.getString("salt"));
        }
        return thisUser;
    }

    public List<User> getBrewersOnly() {
        List<User> userList = new ArrayList<>();

        String sql = "select\n" +
                "       userid,\n" +
                "       firstname,\n" +
                "       lastname,\n" +
                "       user_name,\n" +
                "       password,\n" +
                "       dateofbirth,\n" +
                "       active,\n" +
                "       role,\n" +
                "       salt\n" +
                "from\n" +
                "     usertable\n" +
                "where role = 'brewer';";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            userList.add(mapUsers(results));
        }
        return userList;
    }

    private User mapUsers(SqlRowSet results
//			, boolean returnPassword
    ) {
        User thisUser = new User();
        thisUser.setId(results.getLong("userid"));
        thisUser.setFirstName(results.getString("firstname"));
        thisUser.setLastName(results.getString("lastname"));
        thisUser.setUserName(results.getString("user_name"));
        thisUser.setPassword(results.getString("password"));
        thisUser.setDateOfBirth(results.getString("dateofbirth"));
        thisUser.setActive(results.getBoolean("active"));
        thisUser.setRole(User.UserRole.fromString(results.getString("role")));
        thisUser.setSalt(results.getString("salt"));


//		if (returnPassword){
//			thisUser.setPassword(results.getString("password"));
//			thisUser.setSalt(results.getString("salt"));
//		}
        return thisUser;
    }

    @Override
    public User addFavBreweryByBreweryId(long userId, Brewery brewery) {
        String sql = "insert into userFavouriteBrewery\n" +
                "    (userid, breweryid)\n" +
                "    values (:userid, :breweryId) returning userid;";
        Map<String, Object> params = new HashMap<>();
        params.put("userid", userId);
        params.put("breweryId", brewery.getBreweryId());
        Long id = this.jdbcTemplate.queryForObject(sql, params, Long.class);

        return getUserById(id);
    }

    @Override
    public void deleteFavBreweryByBreweryId(long userId, Brewery brewery) {
        String sql = "delete from userfavouritebrewery\n" +
                "where userid = :userid and breweryid = :breweryId;";
        Map<String, Object> params = new HashMap<>();
        params.put("userid", userId);
        params.put("breweryId", brewery.getBreweryId());
        jdbcTemplate.update(sql, params);
    }

    public List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();

        String sql = "select usertable.userid,\n" +
                "       usertable.firstname,\n" +
                "       usertable.lastname,\n" +
                "       usertable.user_name,\n" +
                "       usertable.password,\n" +
                "       usertable.dateofbirth,\n" +
                "       usertable.active,\n" +
                "       usertable.role,\n" +
                "       usertable.salt,\n" +
                "        b.breweryname\n" +
                "       from usertable\n" +
                "left join brewerytable b on usertable.userid = b.userid order by usertable.userid;";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            User user = mapUsers(results);
            user.setBreweryname(results.getString("breweryname"));
            userList.add(user);
        }
        return userList;
    }


    public User updateUserRole(User user) {
        String sql = "update usertable \n" +
                "set role = :role \n" +
                "where userid = :userid;";
        Map<String, Object> params = new HashMap<>();
        params.put("role", user.getRole().toString());
        params.put("userid", user.getId());
        jdbcTemplate.update(sql, params);
        return getUserById(user.getId());
    }

    public List<User> getUsersWithoutBrewery() {
        List<User> userList = new ArrayList<>();

        String sql = "select \n" +
                "       usertable.userid, \n" +
                "       usertable.firstname, \n" +
                "       usertable.lastname, \n" +
                "       usertable.user_name, \n" +
                "       usertable.password, \n" +
                "       usertable.dateofbirth, \n" +
                "       usertable.active, \n" +
                "       usertable.role, \n" +
                "       usertable.salt \n" +
                "from usertable \n" +
                "    left join brewerytable b \n" +
                "        on usertable.userid = b.userid \n" +
                "where role ='Brewer' and breweryid is null;";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            userList.add(mapUsers(results));
        }
        return userList;

    }

    @Override
    public User getUserSingleUser(User user) {
        String sql = "select usertable.userid,\n" +
                "       usertable.firstname,\n" +
                "       usertable.lastname,\n" +
                "       usertable.user_name,\n" +
                "       usertable.password,\n" +
                "       usertable.dateofbirth,\n" +
                "       usertable.active,\n" +
                "       usertable.role,\n" +
                "       usertable.salt,\n" +
                "       b.breweryname\n" +
                "    from usertable\n" +
                "    left join brewerytable b on usertable.userid = b.userid\n" +
                "where usertable.userid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", user.getId());
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            User newUser = mapUsers(results);
            newUser.setBreweryname(results.getString("breweryname"));
            return newUser;
        }
        return null;
    }
    }
