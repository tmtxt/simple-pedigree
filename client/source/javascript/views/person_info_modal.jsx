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
                {this.props.name}
              </h4>
            </div>
            <div className="modal-body">
              <p>One fine body&hellip;</p>
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
