package com.purple.model;

public class Brewery {

    private int breweryId;
    private int userId;
    private String breweryName;
    private String breweryPhoneNum;
    private String breweryAddress;
    private String breweryHistory;
    private String openingHoursMonThur;
    private String openingHoursFriSun;
    private String imgPath;
    private boolean active;
    private double latitude;
    private double longitude;
    private String brewerynews;

    public String getBrewerynews() {
        return brewerynews;
    }

    public void setBrewerynews(String brewerynews) {
        this.brewerynews = brewerynews;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(int breweryId) {
        this.breweryId = breweryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getBreweryName() {
        return breweryName;
    }

    public void setBreweryName(String breweryName) {
        this.breweryName = breweryName;
    }

    public String getBreweryPhoneNum() {
        return breweryPhoneNum;
    }

    public void setBreweryPhoneNum(String breweryPhoneNum) {
        this.breweryPhoneNum = breweryPhoneNum;
    }

    public String getBreweryAddress() {
        return breweryAddress;
    }

    public void setBreweryAddress(String breweryAddress) {
        this.breweryAddress = breweryAddress;
    }

    public String getBreweryHistory() {
        return breweryHistory;
    }

    public void setBreweryHistory(String breweryHistory) {
        this.breweryHistory = breweryHistory;
    }

    public String getOpeningHoursMonThur() {
        return openingHoursMonThur;
    }

    public void setOpeningHoursMonThur(String openingHoursMonThur) {
        this.openingHoursMonThur = openingHoursMonThur;
    }

    public String getOpeningHoursFriSun() {
        return openingHoursFriSun;
    }

    public void setOpeningHoursFriSun(String openingHoursFriSun) {
        this.openingHoursFriSun = openingHoursFriSun;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
