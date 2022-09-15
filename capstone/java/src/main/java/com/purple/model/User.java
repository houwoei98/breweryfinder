package com.purple.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Locale;

public class User {
    public enum UserRole {
        Standard,
        Admin,
        Vip,
        BeerLover,
        Brewer;

        public static UserRole fromString(String value) {
            if (value != null) {
                for (UserRole each : UserRole.values()) {
                    if (each.name().compareToIgnoreCase(value) == 0) {
                        return each;
                    }
                }
            }
            return BeerLover;
        }
    }

    private long id;
    private UserRole role;

    private String userName;
    private String email;
    private String dateOfBirth;
    private boolean active;
    private String favBreweries;
    private String breweryname;

    public String getBreweryname() {
        return breweryname;
    }

    public void setBreweryname(String breweryname) {
        this.breweryname = breweryname;
    }

    public String getFavBreweries() {
        return favBreweries;
    }

    public void setFavBreweries(String favBreweries) {
        this.favBreweries = favBreweries;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String confirmPassword;

    private String firstName;

    private String lastName;

    private String token;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String salt;

    private Long profileImageId;

    public void setId(long id) {
        this.id = id;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public User() {
        this.role = UserRole.Standard;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the role
     */
    public UserRole getRole() {

        return role;
    }

    /**
     * @param role the role to set
     */
    public void setRole(UserRole role) {

        this.role = role;
    }

    public String getRoleString() {
        return this.role.toString();
    }

    public String getUserName() {

        return userName;
    }

    public void setUserName(String userName) {

        this.userName = userName;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public String getConfirmPassword() {

        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {

        this.confirmPassword = confirmPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isMemberOfRole(String userRoleRequired) {
        return ((this.role != null) && (this.role.toString().equalsIgnoreCase(userRoleRequired)));
    }

    public boolean isMemberOfRole(UserRole userRoleRequired) {
        return ((this.role != null) && (this.role.equals(userRoleRequired)));
    }

    public Long getProfileImageId() {
        return profileImageId;
    }

    public void setProfileImageId(Long profileImageId) {
        this.profileImageId = profileImageId;
    }
}
