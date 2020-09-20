import React,{useState,useEffect,useContext, Component} from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    body: {
        margin: '20px auto',
        height: 'auto',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: '50px auto',
      },
      inputForm: {
          width: '250px',
          margin: '10px',
      },
      dateForm: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
      btnForm: {
          textAlign: 'right',
          marginRight: '40px',
      },
  });
  

const AddTodos =()=>{
    const history = useHistory()

    const classes = useStyles();
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("") 
    const [createdAt,setCreatedAt] = useState("")
    const [finishedAt,setFinishedAt] = useState("")
const Add = ()=>{


    useEffect(()=>{
        fetch('/todos/newtodo',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title,
                description,
                createdAt,
                finishedAt
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
             if(data.error){
                console.log('erreur')
             }
             else{
                console.log('todo added')
                history.push('/home')
     
             }
         }).catch(err=>{
             console.log(err)
         })
     },[])
    }


    return(
        <div className={classes.body}>
        <div className={classes.form}>
            <div className={classes.inputForm}>
                <div>Title :</div>
                <div>
                <input  type="text" placeholder="Title"
                value={title} 
                onChange={(e)=>setTitle(e.target.value)} />
                </div>
            </div>
            <div className={classes.inputForm}>
                <div>Description :</div>
                <div>
                   <textarea placeholder=""
                   value={description} 
                   onChange={(e)=>setDescription(e.target.value)} />
                </div>
            </div>
            <div className={classes.inputForm}>
                <div>Created At :</div>
                <div className={classes.dateForm}>
                   <input type="datetime" placeholder="2020-09-15 05:12:12"
                   value={createdAt} 
                   onChange={(e)=>setCreatedAt(e.target.value)}
                   />
                </div>
            </div>
            <div className={classes.inputForm}>
                <div>Finished At :</div>
                <div className={classes.dateForm}>
                <input type="datetime" placeholder="2020-09-15 05:12:12"
                value={finishedAt} 
                onChange={(e)=>setFinishedAt(e.target.value)}
                />
                </div>
            </div>
            
    </div>
    <div className={classes.btnForm}>
        <Button className={classes.add} onClick={(e)=>Add()} >Add Todo</Button>
        </div>
    </div>

    )
}
export default AddTodos;