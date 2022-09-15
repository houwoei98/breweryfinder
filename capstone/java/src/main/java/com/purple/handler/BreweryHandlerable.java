package com.purple.handler;

import com.purple.model.Brewery;
import com.purple.model.User;

import java.util.List;

public interface BreweryHandlerable {

    public List<Brewery> getAllBreweries(User user);

    public Brewery getBreweryById(User user, long id);

    public Brewery updateBrewery(User user, Brewery brewery);

    public Brewery updateBreweryNews(User user, Brewery brewery);

    public Brewery updateBreweryToInActive(User user, Brewery brewery);

    public Brewery updateBreweryToActive(User user, Brewery brewery);

    public List<Brewery> getAllBreweryForBeerId(User user, long id);

    public Brewery addNewBrewery(User user, Brewery brewery);

    public Brewery getBreweryByUserId(User user, long userId);

    public List<Brewery> getFavouriteBreweriesByUser(User user);

    public List<Brewery> getAllActiveBreweries(User user);
}
