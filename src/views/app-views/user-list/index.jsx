import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Table, Tag } from "antd";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { connect } from "react-redux";
import { fetchUsers, showLoading } from "redux/actions/Users";

const stringSorter = {
	compare(a, b) {
		a = a.name.toLowerCase();
		b = b.name.toLowerCase();
		return a > b ? -1 : b > a ? 1 : 0;
	},
};

const UserList = (props) => {
	const { fetchUsers, showLoading, loading, data } = props;

	useEffect(() => {
		showLoading();
		fetchUsers();
	}, []);

	const history = useHistory();

	const tableColumns = [
		{
			title: "Full Name",
			dataIndex: "name",
			sorter: stringSorter,
		},
		{
			title: "Username",
			dataIndex: "username",
			sorter: stringSorter,
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: stringSorter,
		},
		{
			title: "Phone",
			dataIndex: "phone",
			render: (phone) => (
				<Tag className="text-capitalize" color={"red"}>
					{phone}
				</Tag>
			),
			sorter: stringSorter,
		},
		{
			title: "Website",
			dataIndex: "website",
			render: (website) => (
				<Tag className="text-capitalize" color={"blue"}>
					{website}
				</Tag>
			),
			sorter: stringSorter,
		},
	];

	return (
		<Card bodyStyle={{ padding: "0px" }}>
			<Table
				rowClassName="table-row"
				onRow={(record) => {
					return {
						onClick: () => history.push(`${APP_PREFIX_PATH}/user-edit/${record.id}`),
					};
				}}
				loading={loading}
				columns={tableColumns}
				dataSource={data}
				rowKey="id"
			/>
		</Card>
	);
};

const mapStateToProps = ({ users }) => {
	const { loading, data } = users;
	return { loading, data };
};

const mapDispatchToProps = {
	fetchUsers,
	showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
