import xmlStringToJson from './xmlToJson';

export function fetchJSON (url) {
    return fetch(url)
        .then(response => response.json())
}

export function fetchXML (url) {
    return fetch(url)
        .then(response => response.text())
}

export function fetchXMLAsJSON (url) {
    return fetchXML(url)
        .then(xmlStringToJson);
}