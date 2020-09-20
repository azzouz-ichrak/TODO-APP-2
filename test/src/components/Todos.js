import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Popup from "reactjs-popup";
import AddTodos from './AddTodos'


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#1a237e',
      color: 'white',
    },
    body: {
      color: '#1a237e',
      fontSize: 15,
      textAlign: 'center',
      
    },
  }))(TableCell);

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
        padding: '50px',
        maxWidth: '900px',
    },
  add: {
    background: 'linear-gradient(45deg, #00695c 30%, #00695c 90%)',
    border: 0,
    borderRadius: 10,
    color: 'white',
    width: '115x',
    height: 45,
    padding: '20px',
    marginRight: '0px',
    margin: 'auto',
  },
  table:{
      marginTop: '25px',
      minWidth: 400,
      maxWidth: '100%',
      margin: 'auto',
  },
  close:{
    background: 'linear-gradient(45deg, #b71c1c, #b71c1c 90%)',
    border: 0,
    borderRadius: 10,
    height: 45,
    color: '#e8eaf6',
  },
  header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-betw',
  },
  finishedRow: {
      textDecoration: 'line-through',
  },
})

const Todos =()=>{
  const [todos, setTodos]= useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("/todos/todolist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Finished = (id)=>{
    fetch(`/todos/finished/${id}`,{
        method:"update"
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = todos.filter(item=>{
            return item.id !== result.id
        })
        setTodos(newData)
    })
}


    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <h3>Todos List</h3>
                <Popup contentStyle={{width: "680px", height:"auto",borderRadius:"24px", backgroundColor:"#EFF0F8"}} 
           trigger={ <Button className={classes.add}>Add Todo</Button>} 
            modal position="right center" closeOnDocumentClick 
           >
                 <AddTodos></AddTodos>
            </Popup>
            </div>
            <TableContainer>
                <Table className={classes.table} >
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Todos</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Created At</StyledTableCell>
                        <StyledTableCell>Updated AT</StyledTableCell>
                        <StyledTableCell>Finished At</StyledTableCell>
                        <StyledTableCell>Finished State</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {todos.map((row) => 
                        (<>
                            {(()=>{
                                if (row.finished== true){
                                    return ( 
                                    <TableRow key={row.title} className={classes.finishedRow}>
                                        <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.createdAt}</StyledTableCell>
                                        <StyledTableCell>{row.updatedAT}</StyledTableCell>
                                        <StyledTableCell>{row.finishedAt}</StyledTableCell>
                                        <StyledTableCell>
                                        <Button className={classes.close} variant="contained"  disabled >Close Todo</Button>
                                            </StyledTableCell>
                                        </TableRow>
                                        )
                                }else {
                                    return(
                                        <TableRow key={row.title}>
                                        <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.createdAt}</StyledTableCell>
                                        <StyledTableCell>{row.updatedAT}</StyledTableCell>
                                        <StyledTableCell>{row.finishedAt}</StyledTableCell>
                                        <StyledTableCell>
                                        <Button className={classes.close} variant="contained" onClick={(e)=>Finished()} >Close Todo</Button>
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                                  
                                  </>             
                    ))}
                    </TableBody>
                     </Table>
                </TableContainer>
       
        </div>
    )
}

export default Todos;