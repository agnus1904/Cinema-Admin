/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import CreateNewCinema from "./views/CreateNew/CreateNewCinema";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import CreateNewMovie from "./views/CreateNew/CreateNewMovie";
import CreateNewActor from "./views/CreateNew/CreateNewActor";
import CreateNewShowTime from "./views/CreateNew/CreateNewShowTime";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SlideshowIcon from '@material-ui/icons/Slideshow';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "???????? ??????????????",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/create-cinema",
    name: "Create New Cinema",
    rtlName: "???????? ??????????????",
    icon: AccountBalanceIcon,
    component: CreateNewCinema,
    layout: "/admin"
  },
  {
    path: "/create-movie",
    name: "Create New Movie",
    rtlName: "???????? ??????????????",
    icon: SlideshowIcon,
    component: CreateNewMovie,
    layout: "/admin"
  },
  {
    path: "/create-actor",
    name: "Create New Actor",
    rtlName: "???????? ??????????????",
    icon: RecentActorsIcon,
    component: CreateNewActor,
    layout: "/admin"
  },
  {
    path: "/create-show-time",
    name: "Create New Show Time",
    rtlName: "???????? ??????????????",
    icon: MovieCreationIcon,
    component: CreateNewShowTime,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "?????? ???????????? ????????????????",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "?????????? ????????????",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "??????????",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "????????????",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "??????????",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "??????????????",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "???????????????? ???? ???????? ???? ????",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "???????????? ????????????????????",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
