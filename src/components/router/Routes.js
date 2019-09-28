/* Pages */
import Login from '../auth/login/LoginContainer';
import AboutUs from '../public/pages/aboutUs/AboutUs';
import ContactUs from '../public/pages/contactUs/ContactUs';
import Job from '../public/pages/job/Job';
/* import SignUp from '../auth/signUp/SignUpContainer';
import UserProfile from '../dashboard/user/profile/ProfileContainer';
import Schedule from '../dashboard/schedule/ScheduleContainer';
import BudgetingTool from '../dashboard/budgetingTool/BudgetingToolContainer';
import GanttChart from '../dashboard/ganttChart/GanttChartContainer';
import OverView from '../dashboard/project/overView/OverViewContainer';
import ProjectDetail from '../dashboard/project/detail/ProjectDetailContainer';
import ProjectEdit from '../dashboard/project/edit/ProjectEditContainer';
import ProjectAdd from '../dashboard/project/add/ProjectAddContainer';
import TaskDetail from '../dashboard/task/detail/TaskDetailContainer';
import MessagesContainer from '../dashboard/messages/MessagesContainer';*/
import NotFound from '../public/error/notFound/NotFound';
// import StyleGuide from '../ui/styleGuide/StyleGuide';
/* Layouts */
// import Dashboard from '../dashboard/DashboardContainer';
import PublicLayout from '../public/publicLayout/PublicLayout';
import FullLayout from '../public/fullLayout/FullLayout';

export const routes = [
/*	{
		id: 15,
		exact: true,
		path: '/dashboard/styleguide',
		Component: StyleGuide,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 14,
		exact: true,
		path: '/dashboard/messages',
		Component: MessagesContainer,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 13,
		exact: true,
		path: '/dashboard/project/:project_id/task/detail/:task_id',
		Component: TaskDetail,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 12,
		exact: false,
		path: '/dashboard/budget/:project_id',
		Component: BudgetingTool,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 11,
		exact: false,
		path: '/dashboard/schedule/:project_id',
		Component: Schedule,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 10,
		exact: false,
		path: '/dashboard/ganttChart/:project_id',
		Component: GanttChart,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 9,
		exact: true,
		path: '/dashboard/project/edit/:project_id',
		Component: ProjectEdit,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 8,
		exact: true,
		path: '/dashboard/project/add',
		Component: ProjectAdd,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 7,
		exact: true,
		path: '/dashboard/project/detail/:project_id',
		Component: ProjectDetail,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 6,
		exact: true,
		path: '/dashboard/profile',
		Component: UserProfile,
		Layout: Dashboard,
		Access: 'Private',
	},
	{
		id: 5,
		exact: true,
		path: '/dashboard',
		Component: OverView,
		Layout: Dashboard,
		Access: 'Private',
	},*/
	{
		id: 5,
		exact: true,
		path: '/job',
		Component: Job,
		Layout: PublicLayout,
		Access: 'Public',
	},
	{
		id: 4,
		exact: true,
		path: '/contactUs',
		Component: ContactUs,
		Layout: PublicLayout,
		Access: 'Public',
	},
	{
		id: 3,
		exact: true,
		path: '/aboutUs',
		Component: AboutUs,
		Layout: PublicLayout,
		Access: 'Public',
	},
	{
		id: 2,
		exact: true,
		path: '/home',
		Component: Login,
		Layout: FullLayout,
		Access: 'Public',
	},
	{
		id: 1,
		exact: true,
		path: '*',
		Component: NotFound,
		Layout: PublicLayout,
		Access: 'Public',
	},
];
