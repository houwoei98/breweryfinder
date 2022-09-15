package com.purple.controller;


import com.purple.handler.UserHandlerable;
import com.purple.model.Beer;
import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.model.UserSearchCriteria;
import com.purple.security.AuthAspect;
import com.purple.security.Authorized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController extends BaseController {

    private final UserHandlerable userHandler;

    @Autowired
    public UserController(UserHandlerable userHandler) {
        this.userHandler = userHandler;
    }

    /*
        JSON example
        {
        "userName":"TestUsername",
        "password":"testpassword"
        }
     */
    @PostMapping(value = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpServletResponse response) {
        if (user == null) {
            return ResponseEntity.badRequest().body("username or password is incorrect");
        }
        User returnUser = this.userHandler.login(user.getUserName(), user.getPassword());
        if (returnUser == null) {
            return ResponseEntity.badRequest().body("username or password is incorrect");
        }
        AuthAspect.setUserCookie(returnUser, response);
        return ResponseEntity.ok(returnUser);
    }

    @GetMapping(value = "/user/current",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCurrentOrBlankUser(HttpServletRequest request) {
        User currentUser = super.getCurrentUserFromCookie(request);
        if (currentUser != null) {
            return ResponseEntity.ok(currentUser);
        }
        return ResponseEntity.ok(new User());
    }

    @PutMapping(value = "/user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> updateUser(HttpServletRequest request, HttpServletResponse response, @RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("User is empty");
        }
        User currentUser = super.getCurrentUserFromAttribute(request);

        User newlyAddedUser = this.userHandler.saveUser(currentUser, user, super.getErrorMessages());
        if (newlyAddedUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newlyAddedUser);
        }
        return ResponseEntity.badRequest().body(super.getErrorString());
    }

    @PostMapping(value = "/user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)

    public ResponseEntity<?> registerUser(HttpServletRequest request, HttpServletResponse response, @RequestBody User user) {

        User newlyAddedUser = this.userHandler.registerUser(null, user, super.getErrorMessages());
        if (newlyAddedUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newlyAddedUser);
        }
        return ResponseEntity.badRequest().body(super.getErrorString());
    }

    @GetMapping(value = "/user/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<User> getUser(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User currentUser = super.getCurrentUserFromAttribute(request);

        User searchedUser = this.userHandler.getUserById(currentUser, id);
        if (searchedUser != null) {
            return ResponseEntity.ok(searchedUser);
        }

        return ResponseEntity.status(403).build();
    }

    @PostMapping(value = "/userSearch",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> getUsers(HttpServletRequest request, HttpServletResponse response, @RequestBody UserSearchCriteria search) {
        User currentUser = super.getCurrentUserFromAttribute(request);

        List<User> searchedUsers = this.userHandler.getUsers(currentUser, search);
        if (searchedUsers != null) {
            return ResponseEntity.ok(searchedUsers);
        }
        return ResponseEntity.badRequest().body(super.getErrorString());
    }

    @GetMapping(value = "/logout",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<User> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        AuthAspect.removeUserFromCookie(request, response);
        return ResponseEntity.ok(new User());
    }

    @GetMapping(value = "/breweries/brewer",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> getBrewersOnly(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.getBrewersOnly(user));
    }

    @DeleteMapping(value = "/delete/user/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public void deleteUser(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        this.userHandler.deleteUser(user, id);
    }

    @DeleteMapping(value = "/delete/brewery/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public void deleteBrewery(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        this.userHandler.deleteBrewery(user, id);
    }

    @PostMapping(value = "/user/add/fav/brewery/{breweryId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "BeerLover")
    public ResponseEntity<?> addFavBreweryByBreweryId(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.addFavBreweryByBreweryId(user, brewery));
    }

    @DeleteMapping(value = "/user/delete/fav/brewery/{breweryId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "BeerLover")
    public void deleteFavBreweryByBreweryId(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        this.userHandler.deleteFavBreweryByBreweryId(user, brewery);
    }

    @GetMapping(value = "/user/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllUsers(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.getAllUsers(user));
    }


    @PutMapping(value = "/User/detail/role/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> updateUserRole(HttpServletRequest request, HttpServletResponse response, @RequestBody User user) {
//        User user1 = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.updateUserRole(user));
    }

    @GetMapping(value = "/user/nobrewery",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> getUsersWithoutBrewery(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.getUsersWithoutBrewery(user));
    }

    @GetMapping(value = "/user/single/user",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getUserSingleUser(HttpServletRequest request, HttpServletResponse response
//            , @PathVariable long id
    ) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.userHandler.getUserSingleUser(user));
    }
}
