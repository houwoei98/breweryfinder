package com.purple.handler;

import com.purple.dao.BreweryDao;
import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.service.ExternalLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreweryHandler implements BreweryHandlerable {
    private final BreweryDao breweryDao;
    private final ExternalLocationService breweryService;

    @Autowired
    public BreweryHandler(BreweryDao breweryDao
            , ExternalLocationService breweryService
    ) {
        this.breweryDao = breweryDao;
        this.breweryService = breweryService;
    }

    @Override
    public List<Brewery> getAllBreweries(User user) {
        List<Brewery> breweryList = breweryDao.getAllBreweries();
        return breweryList;
    }

    @Override
    public Brewery getBreweryById(User user, long id) {
        Brewery brewery = breweryDao.getBreweryById(id);
        return brewery;

    }

    @Override
    public Brewery updateBrewery(User user, Brewery brewery) {
        return breweryDao.updateBrewery(brewery);

    }

    @Override
    public Brewery updateBreweryToInActive(User user, Brewery brewery) {
        return breweryDao.updateBreweryToInActive(brewery);
    }

    @Override
    public Brewery updateBreweryToActive(User user, Brewery brewery) {
        return breweryDao.updateBreweryToActive(brewery);
    }

    @Override
    public Brewery updateBreweryNews(User user, Brewery brewery) {
        return breweryDao.updateBreweryNews(brewery);

    }

    @Override
    public List<Brewery> getAllBreweryForBeerId(User user, long id) {
        return breweryDao.getAllBreweryForBeerId(id);

    }

    @Override
    public Brewery addNewBrewery(User user, Brewery brewery) {
        breweryService.getLocationFromExternal(brewery);
        return breweryDao.addNewBrewery(brewery);

    }

    @Override
    public Brewery getBreweryByUserId(User user, long userId) {
        return breweryDao.getBreweryByUserId(userId);

    }

    @Override
    public List<Brewery> getFavouriteBreweriesByUser(User user) {
        return breweryDao.getFavouriteBreweriesByUser(user.getId());

    }

    @Override
    public List<Brewery> getAllActiveBreweries(User user) {
        List<Brewery> breweryList = breweryDao.getAllActiveBreweries();
        return breweryList;
    }
}
