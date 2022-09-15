package com.purple.handler;

import com.purple.model.WebImage;

public interface WebImageHandlerable {
    WebImage getWebImage(Long id);

    WebImage saveWebImage(WebImage webImage);
}
