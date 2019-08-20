'use strict';


import startView from './modules/startView';
import showFullInfo from './modules/showFullInfo';
import addEventMedia from './modules/addEventMedia';
import apiSearch from './modules/apiSearch';

const searchForm = document.querySelector('#search-form');
document.addEventListener('DOMContentLoaded', startView());
searchForm.addEventListener('submit', apiSearch);