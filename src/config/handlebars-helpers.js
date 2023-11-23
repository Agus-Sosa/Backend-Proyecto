import handlebars from 'handlebars';

handlebars.registerHelper('contains', function (string, substring, option){
    if(string.includes(substring)){
        return option.fn(this);
    } else {
        return option.inverse(this);
    }
})

export {handlebars as handlebarsHelpers};
