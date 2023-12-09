import React, { useMemo, useRef, useState } from "react";
import { Button, Card, Col, Input, Row, Switch, Upload } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Draggable from "react-draggable";
import { addItem, importItems, deleteItem, deleteAllItems, selectItem, moveItem } from "redux/actions/Board";
import { connect } from "react-redux";
import entities from "assets/data/placement-entities.data.json";

const tabList = [
	{
		key: "tables",
		tab: "Новые столы",
	},
	{
		key: "elements",
		tab: "Новые элементы",
	},
	{
		key: "custom",
		tab: "Custom",
		disabled: true,
	},
	{
		key: "places",
		tab: "Места",
		disabled: true,
	},
	{
		key: "other",
		tab: "Прочее",
		disabled: true,
	},
];

const DraggableBoardItem = ({ item, grid, onClick, onDragStop, active }) => {
	const entity = useMemo(() => entities.find((x) => x.id === item.entityId), [item]);
	const itemRef = useRef(null);

	return (
		<Draggable
			defaultClassNameDragging="dragging"
			onStop={() => {
				const parentRect = itemRef.current.offsetParent.getBoundingClientRect();
				const itemRect = itemRef.current.getBoundingClientRect();

				const x = itemRect.x - parentRect.x - itemRef.current.clientLeft;
				const y = itemRect.y - parentRect.y - itemRef.current.clientTop;

				onDragStop({
					id: item.id,
					x,
					y,
				});
			}}
			bounds="parent"
			grid={grid ? [20, 20] : undefined}
			defaultPosition={{ x: item.x, y: item.y }}
		>
			<div
				onClickCapture={(e) => {
					e.stopPropagation();
					onClick();
				}}
				ref={itemRef}
				className={`board-item ${active ? "active" : ""}`}
				key={item.id}
			>
				<img draggable={false} src={entity.url} alt={entity.title} />
			</div>
		</Draggable>
	);
};

const Placement = (props) => {
	const { selectedItem, items, addItem, importItems, deleteItem, deleteAllItems, selectItem, moveItem } = props;

	const [currentTab, setCurrentTab] = useState("tables");
	const [gridEnabled, setGridEnabled] = useState(true);
	const [isImportLoading, setIsImportLoading] = useState(false);

	const addItemHandler = (entityId) => {
		addItem({
			id: Date.now(),
			entityId,
			x: 0,
			y: 0,
		});
	};

	const handleDeleteItem = (itemId) => {
		selectItem(null);
		deleteItem(itemId);
	};

	const handleDeleteAllItems = () => {
		if (selectedItem) selectItem(null);
		deleteAllItems();
	};


	// i'd like to move import/export to own service
	const handleImport = (file) => {
		setIsImportLoading(true);

		const reader = new FileReader();
		reader.readAsText(file.file.originFileObj, "utf8");
		reader.onload = (event) => {
			const data = JSON.parse(event.target.result);
			if (Array.isArray(data)) {
				const importedItems = data.filter((item) => !["id", "entityId", "x", "y"].some((field) => !(field in item)));
				if (importedItems.length > 0) {
					importItems(importedItems);
				}
			}
			setIsImportLoading(false);
		};
		reader.onerror = () => {
			setIsImportLoading(false);
		};
	};

	const handleExport = () => {
		const date = new Date();
		const formatedDate = [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].join(".");
		const formatedTime = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join("-");

		const fileName = `items-${formatedDate}_${formatedTime}.json`;
		const file = new File([JSON.stringify(items, undefined, 4)], fileName, {
			type: "plain/text",
		});
		const link = document.createElement("a");
		const url = URL.createObjectURL(file);

		link.href = url;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	};

	return (
		<Row gutter={ROW_GUTTER}>
			<Col xs={24} sm={24} md={24} lg={12}>
				<Card
					tabList={tabList}
					activeTabKey={currentTab}
					onTabChange={(key) => {
						setCurrentTab(key);
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<div className="placement-items">
						{entities
							.filter((x) => x.category === currentTab)
							.map((x) => (
								<div onClick={() => addItemHandler(x.id)} key={x.id} className="placement-item">
									<div className="image-container">
										<img src={x.url} alt={x.id} />
									</div>
									<p>{x.title}</p>
								</div>
							))}
					</div>
				</Card>
				{selectedItem && (
					<Card title="Параметры элемента" bodyStyle={{ padding: "20px" }}>
						<Row gutter={ROW_GUTTER}>
							<Col xs={12}>
								X
								<Input value={selectedItem.x} disabled />
							</Col>
							<Col xs={12}>
								Y
								<Input value={selectedItem.y} disabled />
							</Col>
							<Col xs={24}></Col>
						</Row>
					</Card>
				)}
				<Card bodyStyle={{ padding: "20px" }}>
					<Row gutter={ROW_GUTTER}>
						<Col xs={4}>
							<Button onClick={handleExport} disabled={items.length < 1} block type="primary">
								Экспорт
							</Button>
						</Col>
						<Col xs={4}>
							<Upload
								multiple={false}
								showUploadList={false}
								accept="application/json"
								customRequest={() => {}}
								onChange={handleImport}
							>
								<Button loading={isImportLoading} block type="primary">
									Импорт
								</Button>
							</Upload>
						</Col>
						<Col xs={selectedItem ? 8 : 16}>
							<Button onClick={handleDeleteAllItems} disabled={items.length < 1} block danger type="primary">
								Удалить все
							</Button>
						</Col>
						{selectedItem && (
							<Col xs={8}>
								<Button onClick={() => handleDeleteItem(selectedItem.id)} block>
									Удалить элемент
								</Button>
							</Col>
						)}
					</Row>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={24} lg={12}>
				<Card
					title="Карта заведения"
					extra={
						<div style={{ display: "flex", gap: 10 }}>
							<b>Сетка</b>
							<Switch defaultChecked={gridEnabled} onChange={setGridEnabled} />
						</div>
					}
					bodyStyle={{ padding: "20px" }}
				>
					<div onClick={() => selectItem(null)} className={`placement-board ${gridEnabled ? "grid" : ""}`}>
						{items.map((item) => (
							<DraggableBoardItem
								active={selectedItem && item.id === selectedItem.id}
								onClick={() => selectItem(item)}
								onDragStop={moveItem}
								grid={gridEnabled}
								item={item}
								key={item.id}
							/>
						))}
					</div>
				</Card>
			</Col>
		</Row>
	);
};

const mapStateToProps = ({ board }) => {
	const { selectedItem, items } = board;
	return { selectedItem, items };
};

const mapDispatchToProps = {
	addItem,
	importItems,
	deleteItem,
	deleteAllItems,
	selectItem,
	moveItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Placement);
