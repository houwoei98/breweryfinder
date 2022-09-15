package com.purple.handler;

import com.purple.dao.UserDao;
import com.purple.model.Beer;
import com.purple.model.Brewery;
import com.purple.model.User;
import com.purple.model.UserSearchCriteria;
import com.purple.security.Hasher;
import org.bouncycastle.util.encoders.Base64;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserHandler implements UserHandlerable {

    private final UserDao userDao;
    private final Hasher hasher;

    public UserHandler(UserDao userDao, Hasher hasher) {
        this.userDao = userDao;
        this.hasher = hasher;
    }

    @Override
    public User login(String userName, String password) {
        User user = userDao.getUserByUserName(userName, true);
        return validatePassword(password, user) ? user : null;
    }

    private boolean validatePassword(String password, User user) {
        String givenPassword = hasher.computeHash(password, Base64.decode(user.getSalt()));
        return user.getPassword().equals(givenPassword);
    }

    private void updatePasswordToHashAndAddSalt(User user) {
        byte[] salt = hasher.generateRandomSalt();
        user.setSalt(new String(Base64.encode(salt)));
        String givenPassword = hasher.computeHash(user.getPassword(), salt);
        user.setPassword(givenPassword);
    }

    @Override
    public User getUserById(User callingUser, long id) {
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            return userDao.getUserById(id);
        } else if (callingUser.getId() == id) {
            return userDao.getUserById(id);
        }
        return null;
    }

    @Override
    public boolean updateUserPassword(User callingUser, User userToChangePassword, Map<String, String> errorMessages) {
        if (!userToChangePassword.getPassword().equals(userToChangePassword.getConfirmPassword())) {
            errorMessages.put("PasswordsDoNotMatch", "Passwords do not match");
            return false;
        }
        this.updatePasswordToHashAndAddSalt(userToChangePassword);
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            userDao.updatePassword(userToChangePassword.getUserName(), userToChangePassword.getPassword(), userToChangePassword.getSalt());
        } else if (callingUser.getId() == userToChangePassword.getId()) {
            userDao.updatePassword(userToChangePassword.getUserName(), userToChangePassword.getPassword(), userToChangePassword.getSalt());
        }
        return false;
    }

    @Override
    public User registerUser(User callingUser, User newUser, Map<String, String> errorMessages) {
        if ((callingUser == null) || (callingUser.equals(newUser))) {
            if (userDao.getUserByUserName(newUser.getUserName(), false) != null) {
                errorMessages.put("UsernameExists", "UserName already exists");
                return null;
            }
            updatePasswordToHashAndAddSalt(newUser);
            return userDao.saveUser(newUser);
        }
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            if (userDao.getUserByUserName(newUser.getUserName(), false) != null) {
                errorMessages.put("UsernameExists", "UserName already exists");
                return null;
            }
            updatePasswordToHashAndAddSalt(newUser);
            return userDao.saveUser(newUser);
        }
        errorMessages.put("CannotCreateUser", "No permission to add user");
        return null;
    }

    @Override
    public void deleteUser(User user) {
        userDao.deleteUser(user.getId());
    }

    @Override
    public User saveUser(User callingUser, User newUser, Map<String, String> errorMessages) {
        if ((callingUser == null) || (callingUser.equals(newUser))) {
            return userDao.saveUser(newUser);
        }
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            return userDao.saveUser(newUser);
        }
        errorMessages.put("CannotCreateUser", "No permission to add user");
        return null;
    }

    public List<User> getUsers(User callingUser, UserSearchCriteria searchCriteria) {

        return this.userDao.getUsers(callingUser, searchCriteria);
    }

    @Override
    public void deleteUser(User callingUser, long id) {
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            userDao.deleteUser(id);
        } else if (callingUser.getId() == id) {
            userDao.deleteUser(id);
        }
    }

    @Override
    public void deleteBrewery(User callingUser, long id) {
        if (callingUser.isMemberOfRole(User.UserRole.Admin)) {
            userDao.deleteBrewery(id);
        } else if (callingUser.getId() == id) {
            userDao.deleteBrewery(id);
        }
    }

    @Override
    public List<User> getBrewersOnly(User user) {

        return userDao.getBrewersOnly();
    }

    @Override
    public User addFavBreweryByBreweryId(User user, Brewery brewery) {

        return userDao.addFavBreweryByBreweryId(user.getId(), brewery);
    }

    @Override
    public void deleteFavBreweryByBreweryId(User callingUser, Brewery brewery) {
        userDao.deleteFavBreweryByBreweryId(callingUser.getId(), brewery);
    }

    @Override
    public List<User> getAllUsers(User user) {
        List<User> userList = userDao.getAllUsers();
        return userList;
    }

    @Override
    public User updateUserRole(User user) {
        return userDao.updateUserRole(user);
    }
    @Override
    public List<User> getUsersWithoutBrewery(User user) {
        List<User> userList = userDao.getUsersWithoutBrewery();
        return userList;

    }

    @Override
    public User getUserSingleUser(User user) {
        return userDao.getUserSingleUser(user);
    }
}
