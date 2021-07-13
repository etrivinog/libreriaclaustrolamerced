
//URL Remote server
const urlBase = "https://hemerotecaudc.herokuapp.com/";
//const urlBase = "http://localhost:8080/";

//API version
const urlAPIversion = "api/v1/";

const urlLibros = urlAPIversion+"books/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlLibrosSave    = urlBase+urlLibros+"save";
const urlLibrosUpdate  = urlBase+urlLibros+"update";
const urlLibrosDelete  = urlBase+urlLibros+"delete";

const parametroLibroId = "?libroId=";

export {urlBase, urlAPIversion}
