package com.purple.handler;

import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.model.UserSearchCriteria;

import java.util.List;
import java.util.Map;

public interface UserHandlerable {
    User login(String userName, String password);

    User getUserById(User callingUser, long id);

    boolean updateUserPassword(User callingUser, User userToChangePassword, Map<String, String> errorMessages);

    User registerUser(User callingUser, User newUser, Map<String, String> errorMessages);

    void deleteUser(User user);

    User saveUser(User callingUser, User newUser, Map<String, String> errorMessages);

    List<User> getUsers(User callingUser, UserSearchCriteria searchCriteria);

    void deleteUser(User callingUser, long id);

    void deleteBrewery(User callingUser, long id);

    public List<User> getBrewersOnly(User user);

    User addFavBreweryByBreweryId(User user, Brewery brewery);

    public void deleteFavBreweryByBreweryId(User callingUser, Brewery brewery);

    public List<User> getAllUsers(User user);

    public User updateUserRole(User user);

    public List<User> getUsersWithoutBrewery(User user);

    public User getUserSingleUser(User user);
}
