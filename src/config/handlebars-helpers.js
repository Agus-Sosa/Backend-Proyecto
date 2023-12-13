import handlebars from 'handlebars';


// Helper para verificar si alguna propiedad es string
handlebars.registerHelper('contains', function (string, substring, option){
    if(string.includes(substring)){
        return option.fn(this);
    } else {
        return option.inverse(this);
    }
})

// helper para comparar igualdad en hanndlebars
handlebars.registerHelper('eq', function(a, b, option){
    return a === b ? option.fn(this) : option.inverse(this)
})


export {handlebars as handlebarsHelpers};
