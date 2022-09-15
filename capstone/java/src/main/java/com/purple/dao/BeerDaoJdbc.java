package com.purple.dao;

import com.purple.model.Beer;

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
public class BeerDaoJdbc implements BeerDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public BeerDaoJdbc(DataSource datasource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(datasource);
    }

    public List<Beer> getAllBeer() {
        List<Beer> beers = new ArrayList<>();

        String sql = "select\n" +
                "       beerid,\n" +
                "       beername,\n" +
                "       beerdescription,\n" +
                "       beertype,\n" +
                "       abv,\n" +
                "       active,\n" +
                "       imgpath\n" +
                "from beertable;";
        Map<String, Object> params = new HashMap<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            beers.add(mapRowToBeer(results));
        }
        return beers;
    }

    public Beer getBeerById(long id) {
        String sql = "select\n" +
                "       beerid,\n" +
                "       beername,\n" +
                "       beerdescription,\n" +
                "       beertype,\n" +
                "       abv,\n" +
                "       active,\n" +
                "       imgpath\n" +
                "from beertable\n" +
                "where beerid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            return mapRowToBeer(results);
        }
        return null;
    }

    private Beer mapRowToBeer(SqlRowSet results) {
        Beer beer = new Beer();
        beer.setBeerId(results.getInt("beerid"));
        beer.setBeerName(results.getString("beername"));
        beer.setBeerDescription(results.getString("beerdescription"));
        beer.setBeerType(results.getString("beertype"));
        beer.setAbv(results.getString("abv"));
        beer.setActive(results.getBoolean("active"));
        beer.setImgPath(results.getString("imgpath"));
        return beer;
    }

    public List<Beer> getAllBeerForBreweryId(long id) {
        List<Beer> beerList = new ArrayList<>();
        String sql = "select beertable.beerid, \n" +
                "       beertable.beername, \n" +
                "       beertable.beerdescription, \n" +
                "       beertable.beertype, \n" +
                "       beertable.abv, \n" +
                "       brewerybeertable.active,\n" +
                "       beertable.imgpath \n" +
                "from beertable\n" +
                "join brewerybeertable on beertable.beerid = brewerybeertable.beerid\n" +
                "join brewerytable on brewerybeertable.breweryid = brewerytable.breweryid\n" +
                "where brewerytable.breweryid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            beerList.add(mapRowToBeer(results));
        }
        return beerList;
    }

    public Beer addBeer(Beer beer) {
        String sql = "insert into beertable (beername, beerdescription, beertype, abv, active, imgpath)\n" +
                "values (:name, :description, :type, :abv, :active, :imgpath) returning beerid;";
        Map<String, Object> params = new HashMap<>();
        params.put("name", beer.getBeerName());
        params.put("description", beer.getBeerDescription());
        params.put("type", beer.getBeerType());
        params.put("abv", beer.getAbv());
        params.put("active", beer.isActive());
        params.put("imgpath", beer.getImgPath());
        Long id = this.jdbcTemplate.queryForObject(sql, params, Long.class);
        return getBeerById(id);
    }

    public void linkBeerAndBrewery(long brewerId, Beer beer) {
        String sql = "insert into brewerybeertable (breweryid, beerid, active)\n" +
                "values (:breweryid, :beerid, true); ";
        Map<String, Object> params = new HashMap<>();
        params.put("breweryid", brewerId);
        params.put("beerid", beer.getBeerId());
        this.jdbcTemplate.update(sql, params);
    }

    public void updateToInactiveBeer(long brewerId, Beer beer) {
        String sql = "update brewerybeertable\n" +
                "set active = FALSE\n" +
                "where beerid = :beerid and breweryid = :brewerid;";
        Map<String, Object> params = new HashMap<>();
        params.put("beerid", beer.getBeerId());
        params.put("brewerid", brewerId);
        this.jdbcTemplate.update(sql, params);
    }

    public void updateToActiveBeer(long brewerId, Beer beer) {
        String sql = "update brewerybeertable\n" +
                "set active = TRUE\n" +
                "where beerid = :beerid and breweryid = :brewerid;";
        Map<String, Object> params = new HashMap<>();
        params.put("beerid", beer.getBeerId());
        params.put("brewerid", brewerId);
        this.jdbcTemplate.update(sql, params);
    }

    public Beer updateBeer(Beer beer) {
        String sql = "update beertable\n" +
                "set\n" +
                "    beername = :beername,\n" +
                "    beerdescription = :beerdescription,\n" +
                "    beertype = :beertype,\n" +
                "    abv = :abv,\n" +
                "    active = :active,\n" +
                "    imgpath = :imgpath\n" +
                "where beerid = :beerid;";
        Map<String, Object> params = new HashMap<>();
        params.put("beerid", beer.getBeerId());
        params.put("beername", beer.getBeerName());
        params.put("beerdescription", beer.getBeerDescription());
        params.put("beertype", beer.getBeerType());
        params.put("abv", beer.getAbv());
        params.put("active", beer.isActive());
        params.put("imgpath", beer.getImgPath());
        jdbcTemplate.update(sql, params);
        return getBeerById(beer.getBeerId());
    }
}