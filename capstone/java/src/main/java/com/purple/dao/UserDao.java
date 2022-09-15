package com.purple.dao;

import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.model.UserSearchCriteria;

import java.util.List;

public interface UserDao {

    User saveUser(User user);

    void updatePassword(String userName, String password, String salt);

    User getUserByUserName(String userName, boolean returnPassword);

    User getUserById(Long id);

    List<User> getUsers(User currentUser, UserSearchCriteria searchCriteria);

    public List<User> getBrewersOnly();

    void deleteUser(long id);

    public void deleteBrewery(long id);

    public User addFavBreweryByBreweryId(long userId, Brewery brewery);

    public void deleteFavBreweryByBreweryId(long userId, Brewery brewery);

    public List<User> getAllUsers();

    public User updateUserRole(User user);

    public List<User> getUsersWithoutBrewery();

    public User getUserSingleUser(User user);

}
