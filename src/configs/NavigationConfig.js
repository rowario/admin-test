import { DashboardOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
    {
        key: "pages",
        path: `${APP_PREFIX_PATH}/pages`,
        title: "Основные",
        breadcrumb: false,
        submenu: [
            {
                key: "home",
                path: `${APP_PREFIX_PATH}/home`,
                title: "Главная",
                icon: DashboardOutlined,
                breadcrumb: false,
                submenu: [],
            },
            {
                key: "clients",
                title: "Клиенты",
                icon: UserOutlined,
                submenu: [
                    {
                        key: "user-list",
                        path: `${APP_PREFIX_PATH}/user-list`,
                        title: "Список клиентов",
                        submenu: [],
                    },
                ],
            },
            {
                key: "configs",
                title: "Конфигуратор",
                icon: SettingOutlined,
                submenu: [
                    {
                        key: "user-list",
                        path: `${APP_PREFIX_PATH}/placement`,
                        title: "Карта заведения",
                        submenu: [],
                    },
                ],
            },
        ],
    },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
