export const formatYelpSearchUrl = (term: string) => {
    return `https://api.yelp.com/v3/businesses/search?term=${term}&location=birmingham,al`
};