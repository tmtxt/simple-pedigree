var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="modal fade js-info-modal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title">
                {this.props.person.name}
              </h4>
            </div>
            <div className="modal-body">
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
                  <img className="img-responsive" src="/3.jpg" />
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
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
