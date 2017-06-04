import React from 'react'
import ReactDOM from 'react-dom'

import GHClient from './gh_client'

import Config from './components/config'
import Kanbans from './components/kanbans'

const EventEmitter = require('events');

class AppModel {
  constructor(){
    this.kanbans = [];
    this.columns = {};
    this.cards = {};
    this.contents = {};

    this.load_token();
    this.load_org();
    this.ee = new EventEmitter();
    this.gh_client = new GHClient();
    this.load_kanbans();
  }
  
  load_token(){ 
    this.token = localStorage.token 
  }
  load_org(){ 
    this.org = localStorage.org 
  }
  set_token(token){
    this.token = token;
    localStorage.token = token;
  }
  set_org(org){
    this.org = org;
    localStorage.org = org;
  }

  load_kanbans(){
    if(this.token && this.org){
      const path = "/orgs/"+this.org+"/projects";
      this.gh_client.get(path, this.token, (res)=>{
        this.kanbans = res;
        this.kanbans.forEach((k)=>{
          this.load_columns(k.id);
        });
        this.ee.emit("load_kanbans");
      })
    }
  }
  
  load_columns(id){
    const path = "/projects/"+String(id)+"/columns";
    this.gh_client.get(path, this.token, (res)=>{
      this.columns[id] = res;
      res.forEach((c)=>{
        this.load_cards(id, c);
      });
    });
  }

  load_cards(project_id, column){
    this.gh_client.get(column.cards_url, this.token, (res)=>{
      this.cards[column.id] = res;
      res.forEach((c)=>{
        if(c.content_url){
          this.load_content(c);
        };
      });
      this.ee.emit("load_kanbans");
    });
  }

  load_content(card){
    this.gh_client.get(card.content_url, this.token, (res)=>{
      this.contents[card.id] = res;
      this.ee.emit("load_kanbans");
    });

  }
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.model = new AppModel()
  }

  render(){
    return <div>
      <Kanbans model={this.model} />
      <Config model={this.model}/>
    </div>
  }
}


ReactDOM.render(<App />, document.querySelector('#app'));
