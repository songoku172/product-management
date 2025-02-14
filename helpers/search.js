module.exports = (query) => {
    let objectSearch = {
        keyWord: "",
    }
    if(query.keyWord){
        objectSearch.keyWord = query.keyWord;
        
        const regex = new RegExp(objectSearch.keyWord,"i");
        objectSearch.regex = regex;
    };
    return objectSearch;
}