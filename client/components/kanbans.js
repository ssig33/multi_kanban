import React from 'react'

class Labels extends React.Component{
  render(){
    const labels = this.props.labels.filter((o)=> !o.name.match(/review/));
    return <div>
      {labels.map((l)=>{
        return <span key={l.id} style={{backgroundColor: "#"+(l.color), color: "white", fontSize: "x-small"}}>{l.name}</span>
      })}
    </div>
  }
}

class Card extends React.Component {
  render(){
    const content = this.props.model.contents[this.props.card.id];
    let labels = []
    if(content){ labels = content.labels; }
    return <td className='card' width="150px" key={this.props.card.id}>
      <Labels labels={labels} />
      <p style={{fontSize: "small"}}>{content ? <a href={content.html_url}>{content.title}</a> : this.props.card.note }</p>
    </td>
  }
}

class Column extends React.Component {
  render(){
    let cards = this.props.model.cards[this.props.column.id];
    let html = null;
    if(cards){
      var length = cards.length;
      var count = 3; 
      let newArr = [];

      for(var i = 0; i < Math.ceil(length / count); i++) {
        var j = i * count;
        var p = cards.slice(j, j + count);
        newArr.push(p);
      }
      let width = 150*count;
      if(newArr.length == 1){
        width = newArr[0].length * 150;
      }
      if(newArr.length == 0){
        width = 0;
      }
      html = <table style={{width: width}}>
        <tbody>
          {newArr.map((cs)=>{
            return <tr key={Math.random()}>
              {cs.map((c)=>{
                return <Card card={c} model={this.props.model} key={c.id}/>
              })}
            </tr>
          })}
        </tbody>
      </table>
    }

    return <td style={{borderLeft: "1px solid black"}}>
      {html}
    </td>
  }
}

class Kanban extends React.Component{
  render(){
    const columns = this.props.model.columns[this.props.kanban.id];
    let tds = null;
    if(columns){
      tds = columns.map((c)=>{
        return <Column column={c} key={c.id} model={this.props.model}/>
      });
    }
    return <tr style={{"borderBottom": "1pt solid black"}}>
      <th><a href={this.props.kanban.html_url}>{this.props.kanban.name}</a></th>
      {tds}
    </tr>
  }
}

class Header extends React.Component{
  render(){
    const columns = this.props.model.columns[Object.keys(this.props.model.columns)[0]];
    if(columns){
      const html = columns.map((c)=>{
        return <th key={`h_${c.id}`}>{c.name}</th>
      });
      return <tr>
        <td>
        </td>
        {html}
      </tr>
    } else {
      return null
    }
  }
}

export default class Kanbans extends React.Component {
  constructor(props){
    super(props);
    this.props.model.ee.on("load_kanbans", ()=>{
      this.forceUpdate();
    });
  }
  render(){
    const kanbans = this.props.model.kanbans.map((e)=>{
      return <Kanban kanban={e} key={e.id} model={this.props.model}/>
    });
    return <div>
      <table>
        <thead>
          <Header model={this.props.model} />
        </thead>
        <tbody>
          {kanbans} 
        </tbody>
      </table>
    </div>
  }
}
