// import './App.css';
import Orbit from '../ipfs/worker';
import React, {Component} from 'react';
import { Form,Input,Button } from 'semantic-ui-react'
import Chat from './chat';
import { animateScroll as scroll} from 'react-scroll'
var CryptoJS = require("crypto-js");
import axios from 'axios'

let Obj,db;
class ChatApp extends Component {
//  static async getInitialProps(props){
//      let name
//      try{
//          const data=axios.get('http://54.191.195.43:9999/users/'+props.id)
//          name=data.data.name
//          console.log(name)
//      }catch(err){
//          name='Anonymous'
//      }
//      return {name}
//  }
  state = {
    
    msg : '',
    Latest : null,
    loading :true,
    count:0,
    name:'Anonymous'
  };
  constructor(props){
    super(props)
    Obj = new Orbit(this.props.address);
    // this.state={db:null}
  }
  async componentDidMount(){
    console.log('%%%%%')
    axios.get('http://54.191.195.43:9999/users/'+this.props.id)
    .then(data=>{this.setState({name:data.data.name})
                console.log(data.data.name)
})
    .catch(this.setState({name:'Anonymous'}))
    .catch(err=>console.log(err))
    console.log('orbit instantiated'+Obj)
    console.log('&&&')

    try{
      this.setState({loading : true})
      console.log('Starting ipfs')
      Obj.startingIPFS().then((obj) => {
        db=obj
        // console.log(db)
        const latest = db.iterator({ limit: -1 }).collect()
        this.setState({ Latest: latest,loading : false });
        // this.setState({loading : false})
        // console.log('TTTT'+Obj.gettingId())
        // this.setState({userId:Obj.gettingId()})
        console.log("DB Instantiated"+db)
      }).catch((err) => {
        console.log(err)
      });
    }catch(err)
    {
      console.error(err)
    } 
  }

  onReplication = () => {
    
        // console.log("hello###"+db)
        db.events.on('replicated',()=>{
        
        // console.log('Replication fired!!!')
        const latest = db.iterator({ limit: -1 }).collect()
        if(latest.length>this.state.count)
        {
          console.log(latest.length)
          console.log('Replication fired and setting state')
          this.setState({ Latest: latest ,count:latest.length});
          scroll.scrollToBottom();
        }
        
        // this.setState({ Latest: latest})
        
        // setInterval(this.setLatest(latest),1000*15)
        
    })
    // setInterval(,1000*5)
  }
  // setLatest=(result)=>{
  //   console.log('Replication fired and setting state')
    
  // }

  restartSetState=(Latest)=>{
    this.setState({Latest})
    scroll.scrollToBottom();
  }

  renderComment(){
    
    return this.state.Latest.map((e)=>{
      // var bytes  = CryptoJS.AES.decrypt(e.payload.value.msg, this.props.pass);
      // var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return <Chat latest = {e.payload.value} userId={this.state.name} obj = {this.Obj} callback={this.restartSetState} pass={this.props.pass}/>
    })
  }

  addingToOrbitDb = async(entry) => {
    Obj.addingToDB(entry).then((result) => {
      
      console.log('result is '+result)
      this.setState({Latest:result})
      scroll.scrollToBottom();
    }).catch((err) => {
      console.log(err)
    });
  }

  onSubmit = async(event) => {
    event.preventDefault();
    var today = new Date();
    var date = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear();
    var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    var ciphertext = CryptoJS.AES.encrypt(this.state.msg, this.props.pass).toString();
    
    
    // console.log(date+' '+time)
    // console.log('on submit%%%')
    // console.log('this.state.userId'+this.state.userId)

    const entry={reply:false,userId:this.state.name, msg:ciphertext, date:date, time:time}
    // console.log(entry)
    // const entry1 = Obj.addingToDB(entry)
    // count++
    this.setState({msg:''})
    this.addingToOrbitDb(entry)
  }
  
  render() {
    if(!this.state.loading){
      console.log('***')
    this.onReplication()
    if(this.state.Latest!==null){
  return (
    <div >
      
      {this.renderComment()}
        <footer>
            <Form onSubmit={this.onSubmit} style={{position:'relative',marginTop:'500px'}}>
              <Input
                value={this.state.msg}
                onChange={event => this.setState({msg: event.target.value})}
                placeholder='Enter some Text'
              /> 
              <Button primary >Send</Button>
            </Form>
        </footer>
      
    </div>
  );
    }
    else{
      return(
        <div >
          
      <body><p>No such Messages</p></body>
        <footer>
            <Form onSubmit={this.onSubmit} style={{position:'relative',marginTop:'500px'}}>
              <Input
                value={this.state.msg}
                onChange={event => this.setState({msg: event.target.value})}
                placeholder='Enter some Text'
                
              /> 
              <Button primary >Send</Button>
            </Form>
        </footer>
      
    </div>
      );
    }
  }
    else{
      return(<h1>Hello</h1>);
    }
  }
}

export default ChatApp;
