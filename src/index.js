'use strict';


import startView from './modules/startView';
import apiSearch from './modules/apiSearch';

const searchForm = document.querySelector('#search-form');
document.addEventListener('DOMContentLoaded', startView());
searchForm.addEventListener('submit', apiSearch());