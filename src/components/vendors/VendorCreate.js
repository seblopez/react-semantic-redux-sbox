import React, {Component} from "react";
import VendorForm from "./VendorForm";
import {connect} from "react-redux";
import {createVendor} from "../../actions";

class VendorCreate extends Component {

    onSubmit = formValues => this.props.createVendor(formValues);

    render() {
        return(
            <div>
                <VendorForm title='Create a Vendor' onSubmit={this.onSubmit}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { vendor: state.vendor };
}

export default connect(mapStateToProps, { createVendor })(VendorCreate);