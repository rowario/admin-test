import React, { useEffect, useState } from "react";
import { Card, Form, Button, Input, Row, Col } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { useHistory, useParams } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { fetchUser, showLoading } from "redux/actions/User";
import { connect } from "react-redux";

const EditProfile = (props) => {
	const { data: user, loading, loaded, fetchUser, showLoading } = props;

	const [isLoadingForm, setIsLoadingForm] = useState(false);

	const [form] = Form.useForm();

	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		showLoading();
		fetchUser(params.userId);
	}, []);

	useEffect(() => {
		if (!loading && !user && loaded) {
			history.push(`${APP_PREFIX_PATH}/user-list`);
		}
	}, [user, loading, loaded]);

	const onSubmit = async (e) => {
		e.preventDefault();

		setIsLoadingForm(true);
		await new Promise((res) => setTimeout(res, 500));
		setIsLoadingForm(false);

		history.push(`${APP_PREFIX_PATH}/user-list`);
	};

	if (loading) return <Loading />;

	if (!user) {
		return null;
	}

	return (
		<Card>
			<div className="mt-4">
				<Form
					form={form}
					name="basicInformation"
					layout="vertical"
					onSubmitCapture={onSubmit}
					initialValues={{
						name: user.name,
						username: user.username,
						email: user.email,
						phone: user.phone,
						website: user.website,
					}}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={ROW_GUTTER}>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Full Name"
										name="name"
										rules={[
											{
												required: true,
												message: "Please input your name!",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Username"
										name="username"
										rules={[
											{
												required: true,
												message: "Please input your username!",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Email"
										name="email"
										rules={[
											{
												required: true,
												type: "email",
												message: "Please enter a valid email!",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item label="Phone Number" name="phone">
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item label="Website" name="website">
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Button loading={isLoadingForm} type="primary" htmlType="submit">
								Save Change
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</Card>
	);
};

const mapStateToProps = ({ user }) => {
	const { loading, loaded, data } = user;
	return { loading, loaded, data };
};

const mapDispatchToProps = {
	fetchUser,
	showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
