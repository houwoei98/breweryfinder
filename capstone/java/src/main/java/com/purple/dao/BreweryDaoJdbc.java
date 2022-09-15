package com.purple.dao;

import com.purple.model.Brewery;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

/**
 * JDBCFilmDao implements FilmDao
 */
@Component
public class BreweryDaoJdbc implements BreweryDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public BreweryDaoJdbc(DataSource datasource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(datasource);
    }

    public List<Brewery> getAllBreweries() {
        List<Brewery> breweries = new ArrayList<>();

        String sql = "select\n" +
                "       breweryid,\n" +
                "       userid,\n" +
                "       breweryname,\n" +
                "       breweryphonenum,\n" +
                "       breweryaddress,\n" +
                "       breweryhistory,\n" +
                "       openinghoursmonthur,\n" +
                "       openinghoursfrisun,\n" +
                "       imgpath,\n" +
                "       active,\n" +
                "       latitude,\n" +
                "       longitude,\n" +
                "       brewerynews\n" +
                "from\n" +
                "     brewerytable;";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            breweries.add(mapRowToBrewery(results));
        }
        return breweries;
    }

    public Brewery getBreweryById(long id) {
        String sql = "select\n" +
                "       breweryid,\n" +
                "       userid,\n" +
                "       breweryname,\n" +
                "       breweryphonenum,\n" +
                "       breweryaddress,\n" +
                "       breweryhistory,\n" +
                "       openinghoursmonthur,\n" +
                "       openinghoursfrisun,\n" +
                "       imgpath,\n" +
                "       active,\n" +
                "       latitude,\n" +
                "       longitude,\n" +
                "       brewerynews\n" +
                "from\n" +
                "     brewerytable\n" +
                "where breweryid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            return mapRowToBrewery(results);
        }
        return null;
    }

    public Brewery updateBrewery(Brewery brewery) {
        String sql = "update brewerytable\n" +
                "set\n" +
                "    breweryname = :breweryname,\n" +
                "    breweryphonenum = :breweryphonenum,\n" +
                "    breweryaddress = :breweryaddress,\n" +
                "    breweryhistory = :breweryhistory,\n" +
                "    openinghoursmonthur = :openinghoursmonthur,\n" +
                "    openinghoursfrisun = :openinghoursfrisun,\n" +
                "    imgpath = :imgpath,\n" +
                "    active = :active,\n" +
                "    latitude = :latitude,\n" +
                "    longitude = :longitude\n" +
                "where\n" +
                "    breweryid = :breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", brewery.getBreweryId());
        params.put("userid", brewery.getUserId());
        params.put("breweryname", brewery.getBreweryName());
        params.put("breweryphonenum", brewery.getBreweryPhoneNum());
        params.put("breweryaddress", brewery.getBreweryAddress());
        params.put("breweryhistory", brewery.getBreweryHistory());
        params.put("openinghoursmonthur", brewery.getOpeningHoursMonThur());
        params.put("openinghoursfrisun", brewery.getOpeningHoursFriSun());
        params.put("imgpath", brewery.getImgPath());
        params.put("active", brewery.isActive());
        params.put("latitude", brewery.getLatitude());
        params.put("longitude", brewery.getLongitude());
        jdbcTemplate.update(sql, params);
        return getBreweryById(brewery.getBreweryId());
    }

    public Brewery updateBreweryToInActive(Brewery brewery) {
        String sql = "update brewerytable\n" +
                "set\n" +
                "    active = false \n" +
                "where \n" +
                "    breweryid = :breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", brewery.getBreweryId());
        jdbcTemplate.update(sql, params);
        return getBreweryById(brewery.getBreweryId());
    }

    public Brewery updateBreweryToActive(Brewery brewery) {
        String sql = "update brewerytable\n" +
                "set\n" +
                "    active = true \n" +
                "where \n" +
                "    breweryid = :breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", brewery.getBreweryId());
        jdbcTemplate.update(sql, params);
        return getBreweryById(brewery.getBreweryId());
    }

    public Brewery updateBreweryNews(Brewery brewery) {
        String sql = "update brewerytable set brewerynews = :brewerynews where breweryid = :breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", brewery.getBreweryId());
        params.put("brewerynews", brewery.getBrewerynews());
        jdbcTemplate.update(sql, params);
        return getBreweryById(brewery.getBreweryId());
    }

    private Brewery mapRowToBrewery(SqlRowSet results) {
        Brewery brewery = new Brewery();
        brewery.setBreweryId(results.getInt("breweryid"));
        brewery.setUserId(results.getInt("userid"));
        brewery.setBreweryName(results.getString("breweryname"));
        brewery.setBreweryPhoneNum(results.getString("breweryphonenum"));
        brewery.setBreweryAddress(results.getString("breweryaddress"));
        brewery.setBreweryHistory(results.getString("breweryhistory"));
        brewery.setOpeningHoursMonThur(results.getString("openinghoursmonthur"));
        brewery.setOpeningHoursFriSun(results.getString("openinghoursfrisun"));
        brewery.setImgPath(results.getString("imgpath"));
        brewery.setActive(results.getBoolean("active"));
        brewery.setLatitude(results.getDouble("latitude"));
        brewery.setLongitude(results.getDouble("longitude"));
        brewery.setBrewerynews(results.getString("brewerynews"));
        return brewery;
    }

    public List<Brewery> getAllBreweryForBeerId(long id) {
        List<Brewery> breweryList = new ArrayList<>();
        String sql = "select brewerytable.breweryid,\n" +
                "       brewerytable.userid,\n" +
                "       brewerytable.breweryname,\n" +
                "       brewerytable.breweryphonenum,\n" +
                "       brewerytable.breweryaddress,\n" +
                "       brewerytable.breweryhistory,\n" +
                "       brewerytable.openinghoursmonthur,\n" +
                "       brewerytable.openinghoursfrisun,\n" +
                "       brewerytable.imgpath,\n" +
                "       brewerytable.active,\n" +
                "       brewerytable.latitude,\n" +
                "       brewerytable.longitude,\n" +
                "       brewerytable.brewerynews\n" +
                "       from brewerytable\n" +
                "join brewerybeertable b on brewerytable.breweryid = b.breweryid\n" +
                "join beertable b2 on b.beerid = b2.beerid\n" +
                "where b2.beerid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            breweryList.add(mapRowToBrewery(results));
        }
        return breweryList;
    }

    public Brewery addNewBrewery(Brewery brewery) {
        String sql = "insert into brewerytable (userid, breweryname, breweryphonenum, breweryaddress, breweryhistory, openinghoursmonthur, openinghoursfrisun, imgpath, active, latitude, longitude)\n" +
                "values (:userid, :breweryname, :breweryphonenum, :breweryaddress, :breweryhistory, :openinghoursmonthur, :openinghoursfrisun, :imgpath, :active, :latitude, :longitude) returning breweryid;";
        Map<String, Object> params = new HashMap<>();
        params.put("userid", brewery.getUserId());
        params.put("breweryname", brewery.getBreweryName());
        params.put("breweryphonenum", brewery.getBreweryPhoneNum());
        params.put("breweryaddress", brewery.getBreweryAddress());
        params.put("breweryhistory", brewery.getBreweryHistory());
        params.put("openinghoursmonthur", brewery.getOpeningHoursMonThur());
        params.put("openinghoursfrisun", brewery.getOpeningHoursFriSun());
        params.put("imgpath", brewery.getImgPath());
        params.put("active", true);
        params.put("latitude", brewery.getLatitude());
        params.put("longitude", brewery.getLongitude());
        Long id = this.jdbcTemplate.queryForObject(sql, params, Long.class);
        return getBreweryById(id);
    }

    public Brewery getBreweryByUserId(long id) {
        String sql = "select\n" +
                "       breweryid,\n" +
                "       userid,\n" +
                "       breweryname,\n" +
                "       breweryphonenum,\n" +
                "       breweryaddress,\n" +
                "       breweryhistory,\n" +
                "       openinghoursmonthur,\n" +
                "       openinghoursfrisun,\n" +
                "       imgpath,\n" +
                "       active,\n" +
                "       latitude,\n" +
                "       longitude,\n" +
                "       brewerynews\n" +
                "from\n" +
                "     brewerytable\n" +
                "where userid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            return mapRowToBrewery(results);
        }
        return null;
    }

    public List<Brewery> getFavouriteBreweriesByUser(long userid) {
        List<Brewery> breweryList = new ArrayList<>();
        String sql = "select\n" +
                "        brewerytable.breweryid, \n" +
                "       brewerytable.userid, \n" +
                "       brewerytable.breweryname, \n" +
                "       brewerytable.breweryphonenum, \n" +
                "       brewerytable.breweryaddress, \n" +
                "       brewerytable.breweryhistory, \n" +
                "       brewerytable.openinghoursmonthur, \n" +
                "       brewerytable.openinghoursfrisun, \n" +
                "       brewerytable.imgpath, \n" +
                "       brewerytable.active, \n" +
                "       brewerytable.latitude, \n" +
                "       brewerytable.longitude, \n" +
                "       brewerytable.brewerynews\n" +
                "from\n" +
                "     brewerytable\n" +
                "join userfavouritebrewery u on brewerytable.breweryid = u.breweryid\n" +
                "where u.userid = :userid;";
        Map<String, Object> params = new HashMap<>();
        params.put("userid", userid);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            breweryList.add(mapRowToBrewery(results));
        }
        return breweryList;
    }

    public List<Brewery> getAllActiveBreweries() {
        List<Brewery> breweries = new ArrayList<>();

        String sql = "select\n" +
                "       breweryid,\n" +
                "       userid,\n" +
                "       breweryname,\n" +
                "       breweryphonenum,\n" +
                "       breweryaddress,\n" +
                "       breweryhistory,\n" +
                "       openinghoursmonthur,\n" +
                "       openinghoursfrisun,\n" +
                "       imgpath,\n" +
                "       active,\n" +
                "       latitude,\n" +
                "       longitude,\n" +
                "       brewerynews\n" +
                "from\n" +
                "     brewerytable where active=true;";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            breweries.add(mapRowToBrewery(results));
        }
        return breweries;
    }
}