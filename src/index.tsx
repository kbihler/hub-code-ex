import React from 'react';
import ReactDOM from 'react-dom';
import { ExcersieOne, ExcersieTwo } from './sections';
import './styles/index.scss';
import 'regenerator-runtime/runtime'

ReactDOM.render(
  <React.StrictMode>
    <ExcersieOne />
    <ExcersieTwo />
  </React.StrictMode>,
  document.getElementById('root')
);