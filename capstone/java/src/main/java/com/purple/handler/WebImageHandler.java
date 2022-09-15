package com.purple.handler;

import com.purple.dao.WebImageDao;
import com.purple.model.WebImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebImageHandler implements WebImageHandlerable {
    private final WebImageDao webImageDao;
    @Autowired
    public WebImageHandler(WebImageDao webImageDao){
        this.webImageDao = webImageDao;
    }
    @Override
    public WebImage getWebImage(Long id){
        return webImageDao.getWebImage(id);
    }
    @Override
    public WebImage saveWebImage(WebImage webImage){
        return webImageDao.saveWebImage(webImage);
    }
}
