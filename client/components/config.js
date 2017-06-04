import React from 'react'

export default class Config extends React.Component {
  render(){
    return <div>
      <form onSubmit={(e)=> this.submit(e)}>
        <table>
          <tbody>
            <tr>
              <th>Persnal Token</th>
              <td><input ref="token" defaultValue={this.props.model.token}/></td>
            </tr>
            <tr>
              <th>org</th>
              <td><input ref="org" defaultValue={this.props.model.org}/></td>
            </tr>
          </tbody>
        </table>
        <button>Save</button>
      </form>
    </div>
  }

  submit(e){
    this.props.model.set_token(this.refs.token.value);
    this.props.model.set_org(this.refs.org.value);
    e.preventDefault();
    location.reload();
  }
}


