import React from 'react'
import Todos from './components/Todos'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  app: {
      margin: 'auto',
      padding: 'auto',
  },

})
function App() {
  const classes = useStyles();

  return (
    <div className="App">
     <Todos></Todos>
    </div>
  );
}

export default App;
