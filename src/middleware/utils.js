"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYelpSearchUrl = (term) => {
    return `https://api.yelp.com/v3/businesses/search?term=${term}&location=birmingham,al`;
};
