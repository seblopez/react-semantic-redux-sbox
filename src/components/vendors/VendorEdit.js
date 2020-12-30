import React, {Component} from "react";
import {connect}  from "react-redux";
import VendorForm from "./VendorForm";
import {editVendor, fetchVendor} from "../../actions";

class VendorEdit extends Component {
    componentDidMount() {
        this.props.fetchVendor(this.props.match.params.id);
    }

    onSubmit = formValues => this.props.editVendor(this.props.match.params.id, formValues);

    render() {
        return(
            <div>
                <VendorForm
                    title='Edit Vendor'
                    initialValues={this.props.vendors.payload}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { vendors: state.vendors };
}

export default connect(mapStateToProps, { fetchVendor, editVendor })(VendorEdit);