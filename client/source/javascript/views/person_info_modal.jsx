var React = require("react");

var PersonDetail = require("./person_detail.jsx");

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
              <PersonDetail person={this.props.person} />
            </div>
            <div className="modal-footer">
              <a href={this.props.person.addMarriageUrl}
                 className="btn btn-default">
                Add marriage
              </a>
              <a href={this.props.person.addChildUrl}
                 className="btn btn-default">
                Add child
              </a>
              <a href={this.props.person.treeUrl}
                 className="btn btn-default">
                View tree from this person
              </a>
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
