package com.purple.dao;

import com.purple.model.Brewery;
import com.purple.model.User;

import java.util.List;

public interface BreweryDao {

    public List<Brewery> getAllBreweries();

    public Brewery getBreweryById(long id);

    public Brewery updateBrewery(Brewery brewery);

    public List<Brewery> getAllBreweryForBeerId(long id);

    public Brewery addNewBrewery(Brewery brewery);

    public Brewery getBreweryByUserId(long id);

    public Brewery updateBreweryNews(Brewery brewery);

    public List<Brewery> getFavouriteBreweriesByUser(long userid);

    public Brewery updateBreweryToInActive(Brewery brewery);

    public Brewery updateBreweryToActive(Brewery brewery);

    public List<Brewery> getAllActiveBreweries();
}
