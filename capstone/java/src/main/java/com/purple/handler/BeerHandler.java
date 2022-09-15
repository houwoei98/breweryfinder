package com.purple.handler;

import com.purple.dao.BeerDao;
import com.purple.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeerHandler implements BeerHandlerable {
    private final BeerDao beerDao;
//    private final ExternalBreweryService breweryService;

    @Autowired
    public BeerHandler(BeerDao beerDao
//            ,ExternalBreweryService breweryService
    ) {
        this.beerDao = beerDao;
//        this.breweryService = breweryService;
    }

    @Override
    public List<Beer> getAllBeers(User user) {

        return beerDao.getAllBeer();
    }

    @Override
    public Beer getBeerById(User user, long id) {
        Beer beer = beerDao.getBeerById(id);

        return beer;

    }

    @Override
    public List<Beer> getAllBeerForBreweryId(User user, long id) {

        return beerDao.getAllBeerForBreweryId(id);

    }

    @Override
    public Beer addNewBeerForBreweryId(User user, Beer beer, long brewerId) {
        // add beer to database with dao call
        Beer newBeer = beerDao.addBeer(beer);
        // add record to join beer id 99 with brewery id 10
        beerDao.linkBeerAndBrewery(brewerId, newBeer);
        // return beer if the junction works
        return newBeer;
    }

    @Override
    public Beer addExistingBeerForBreweryId(User user, Beer beer, long brewerId) {
        beerDao.linkBeerAndBrewery(brewerId, beer);
        return beer;
    }

    @Override
    public Beer updateToInactiveBeer(User user, Beer beer, long brewerId) {
        beerDao.updateToInactiveBeer(brewerId, beer);
        return beer;
    }

    @Override
    public Beer updateToActiveBeer(User user, Beer beer, long brewerId) {
        beerDao.updateToActiveBeer(brewerId, beer);
        return beer;
    }

    @Override
    public Beer updateBeer(User user, Beer beer) {
        return beerDao.updateBeer(beer);

    }
}