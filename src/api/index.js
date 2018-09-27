import Vue from 'vue';
import axios from 'axios';

const API_URL = process.env.API_URL

export default axios.create({
    baseURL : 'https://testsoat.interseguro.com.pe/talentfestapi/'
});
