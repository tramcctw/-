import React from 'react';
import { MovieService } from "./services/MovieService";

function App() {

  MovieService.find({}).then(res=>{
    console.log(res);
  })

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default App;
