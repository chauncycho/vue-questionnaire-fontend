import axios from 'axios'
import Vue from 'vue'

export default axios.create({
  baseURL: process.env.API_ROOT
})

