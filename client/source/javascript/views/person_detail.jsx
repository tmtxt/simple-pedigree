var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          
          <div className="col-md-6">
            <div className="panel panel-success">
              <div className="panel-heading">
                Basic Information
              </div>
              <div className="panel-body">
                <table className="table">
                  <tr>
                    <td>Name</td>
                    <td>{this.props.person.name}</td>
                  </tr>
                  <tr>
                    <td>Birth Date</td>
                    <td>{this.props.person.birthDate}</td>
                  </tr>
                  <tr>
                    <td>Death Date</td>
                    <td>{this.props.person.deathDate}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{this.props.person.gender}</td>
                  </tr>
                  <tr>
                    <td>Alive Status</td>
                    <td>{this.props.person.aliveStatus}</td>
                  </tr>
                  <tr>
                    <td>Job</td>
                    <td>{this.props.person.job}</td>
                  </tr>
                  <tr>
                    <td>Phone No</td>
                    <td>{this.props.person.phoneNo}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <img className="img-responsive"
                     src={this.props.person.picture} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">History</div>
              <div className="panel-body">
                {this.props.person.history}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">Other Information</div>
              <div className="panel-body">
                {this.props.person.otherInformation}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
