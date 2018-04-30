const fetchRequest = ( route = '', method = "GET", body = false ) => {
  let options = {
    method: method,
    mode: 'cors',
    headers: new Headers({
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/json',
       }),
    credentials: 'same-origin'
  }

  if( body !== false ){
    options = Object.assign( options, { body: JSON.stringify(body) })
  }

  return fetch( `http://localhost:3000/${route}`, options)
    .then( response => response.json() )
    .catch( error => console.log(error) )
}

export default { fetchRequest }
