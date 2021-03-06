import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'components/Settings/theme.css';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';
import { ForgotPasswordForm } from 'components/Views/Accounts/components/ForgotPasswordForm';

export class ForgotPassword extends Component {
    static displayName = ForgotPassword.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-center" >
                    <Col md="5" >
                        <ShadowBox>
                        <h2 className="text-center">Reset Password</h2>
                            <ForgotPasswordForm/>
                        </ShadowBox>
                    </Col>
                </Row>
            </Container>
        )
    }

}