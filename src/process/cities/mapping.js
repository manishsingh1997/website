const {values} = require('lodash');

const mapping = {
  // City Multiproduct Page (template)
  city: {
    // Primary
    city: ['city'],
    county: ['county'],
    state: ['state'],
    // Base info
    address: ['address'],
    phone: ['phone'],
    // Header
    'header title': ['header', 'title'],
    'header bullet 1': ['header', 'bullets', 0],
    'header bullet 2': ['header', 'bullets', 1],
    'header bullet 3': ['header', 'bullets', 2],
    'header bullet 4': ['header', 'bullets', 3],
    // Ratings
    'angi score': ['rating', 'Angi'],
    'bbb score': ['rating', 'BBB'],
    'google score': ['rating', 'Google'],
    'thumbtack score': ['rating', 'Thumbtack'],
    'yelp score': ['rating', 'Yelp'],
    // Yelp review
    'review 1': ['review', 'Yelp', 'description'],
    'poster name 1': ['review', 'Yelp', 'name'],
    'call out 1': ['review', 'Yelp', 'title'],
    'project address 1': ['review', 'Yelp', 'address'],
    'listing url 1': ['review', 'Yelp', 'url'],
    'review screenshot 1': ['review', 'Yelp', 'img'],
    // Google review
    'review 2': ['review', 'Google', 'description'],
    'poster name 2': ['review', 'Google', 'name'],
    'call out 2': ['review', 'Google', 'title'],
    'project address 2': ['review', 'Google', 'address'],
    'listing url 2': ['review', 'Google', 'url'],
    'review screenshot 2': ['review', 'Google', 'img'],
    // Project showcases
    'project showcase URL 1': ['projects', 0, 'url'],
    'project photo 1': ['projects', 0, 'img'],
    'caption 1': ['projects', 0, 'label'],
    'project showcase URL 2': ['projects', 1, 'url'],
    'project photo 2': ['projects', 1, 'img'],
    'caption 2': ['projects', 1, 'label'],
    // Product
    product: ['product', 'type'], // Fence & Concrete | Fence
    'fence & gate photo': ['product', 'data', 'fence', 'img'],
  },
  // City Fence Page (template)
  product: {
    // Primary
    city: ['city'],
    county: ['county'],
    state: ['state'],
    // License
    'license URL': ['license', 'url'],
    'license 1': ['licenses', 0],
    'license 2': ['licenses', 1],
    'license 3': ['licenses', 2],
    // Packages
    'packages title': ['packages', 'title'],
    'packages description': ['packages', 'description'],
    'wood package rendering 1': ['packages', 'data', 'wood', 0, 'img'],
    'wood package rendering 2': ['packages', 'data', 'wood', 1, 'img'],
    'wood package rendering 3': ['packages', 'data', 'wood', 2, 'img'],
    'wood package rendering 4': ['packages', 'data', 'wood', 3, 'img'],
    'wood package 1': ['packages', 'data', 'wood', 0, 'title'],
    'wood pkg description 1': ['packages', 'data', 'wood', 0, 'description'],
    'wood package 2': ['packages', 'data', 'wood', 1, 'title'],
    'wood pkg description 2': ['packages', 'data', 'wood', 1, 'description'],
    'wood package 3': ['packages', 'data', 'wood', 2, 'title'],
    'wood pkg description 3': ['packages', 'data', 'wood', 2, 'description'],
    'wood package 4': ['packages', 'data', 'wood', 3, 'title'],
    'wood pkg description 4': ['packages', 'data', 'wood', 3, 'description'],
    'vinyl package rendering 1': ['packages', 'data', 'vinyl', 0, 'img'],
    'vinyl package rendering 2': ['packages', 'data', 'vinyl', 1, 'img'],
    'vinyl package rendering 3': ['packages', 'data', 'vinyl', 2, 'img'],
    'vinyl package rendering 4': ['packages', 'data', 'vinyl', 3, 'img'],
    'vinyl package 1': ['packages', 'data', 'vinyl', 0, 'title'],
    'vinyl pkg description 1': ['packages', 'data', 'vinyl', 0, 'description'],
    'vinyl package 2': ['packages', 'data', 'vinyl', 1, 'title'],
    'vinyl pkg description 2': ['packages', 'data', 'vinyl', 1, 'description'],
    'vinyl package 3': ['packages', 'data', 'vinyl', 2, 'title'],
    'vinyl pkg description 3': ['packages', 'data', 'vinyl', 2, 'description'],
    'vinyl package 4': ['packages', 'data', 'vinyl', 3, 'title'],
    'vinyl pkg description 4': ['packages', 'data', 'vinyl', 3, 'description'],
    'chain link package rendering 1': ['packages', 'data', 'chain-link', 0, 'img'],
    'chain link package rendering 2': ['packages', 'data', 'chain-link', 1, 'img'],
    'chain link package rendering 3': ['packages', 'data', 'chain-link', 2, 'img'],
    'chain link package 1': ['packages', 'data', 'chain-link', 0, 'title'],
    'chain link pkg description 1': ['packages', 'data', 'chain-link', 0, 'description'],
    'chain link package 2': ['packages', 'data', 'chain-link', 1, 'title'],
    'chain link pkg description 2': ['packages', 'data', 'chain-link', 1, 'description'],
    'chain link package 3': ['packages', 'data', 'chain-link', 2, 'title'],
    'chain link pkg description 3': ['packages', 'data', 'chain-link', 2, 'description'],
    'box wire package rendering 1': ['packages', 'data', 'box-wire', 0, 'img'],
    'box wire package rendering 2': ['packages', 'data', 'box-wire', 1, 'img'],
    'box wire package rendering 3': ['packages', 'data', 'box-wire', 2, 'img'],
    'box wire package rendering 4': ['packages', 'data', 'box-wire', 3, 'img'],
    'box wire package 1': ['packages', 'data', 'box-wire', 0, 'title'],
    'box wire pkg description 1': ['packages', 'data', 'box-wire', 0, 'description'],
    'box wire package 2': ['packages', 'data', 'box-wire', 1, 'title'],
    'box wire pkg description 2': ['packages', 'data', 'box-wire', 1, 'description'],
    'box wire package 3': ['packages', 'data', 'box-wire', 2, 'title'],
    'box wire pkg description 3': ['packages', 'data', 'box-wire', 2, 'description'],
    'box wire package 4': ['packages', 'data', 'box-wire', 3, 'title'],
    'box wire pkg description 4': ['packages', 'data', 'box-wire', 3, 'description'],
    // Regulations
    'regulations title': ['regulations', 'title'],
    'regulations description': ['regulations', 'description'],
    'regulations PDF': ['regulations', 'pdf'],
    'regulations JPG': ['regulations', 'img'],
    'fence regulation link': ['regulations', 'url'],
    'front yard': ['regulations', 'faq', 'front-yard'],
    'side yard': ['regulations', 'faq', 'side-yard'],
    'rear max height': ['regulations', 'faq', 'rear-max-height'],
    setback: ['regulations', 'faq', 'setback'],
    'corner lot rules': ['regulations', 'faq', 'corner-lot-rules'],
    // Blog articles
    'blog url 1': ['blog', 'articles', 0, 'url'],
    'blog img 1': ['blog', 'articles', 0, 'img'],
    'blog description 1': ['blog', 'articles', 0, 'description'],
    'blog url 2': ['blog', 'articles', 1, 'url'],
    'blog img 2': ['blog', 'articles', 1, 'img'],
    'blog description 2': ['blog', 'articles', 1, 'description'],
    'blog url 3': ['blog', 'articles', 2, 'url'],
    'blog img 3': ['blog', 'articles', 2, 'img'],
    'blog description 3': ['blog', 'articles', 2, 'description'],
  },
  // Neighboring cities query
  neighboring: {
    city: ['city'],
    county: ['county'],
    state: ['state'],
    neighboring_city: ['to_city'],
    neighboring_county: ['to_county'],
    neighboring_state: ['to_state'],
  },
  // Licenses and Warranty
  licenses: {
    city: ['city'],
    county: ['county'],
    state: ['state'],
    'City License 1': ['license', 'description'],
    'State license': ['license', 'state_number'],
    number: ['license', 'city_number'],
    'State License Image': ['license', 'img'],
    'State License PDF': ['license', 'pdf'],
  },
};

// Images and PDFs
const assets = values({...mapping.city, ...mapping.product, ...mapping.licenses}).filter(
  (p) => p.includes('img') || p.includes('pdf') || p.includes('url')
);

module.exports = {...mapping, assets};
