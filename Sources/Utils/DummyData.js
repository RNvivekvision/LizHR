import { Images } from '../Constants';
import { NavRoutes } from '../Navigation';
import { Colors } from '../Theme';

const DummyData = {
  drawerScreens: [
    {
      icon: Images.dashboard,
      title: 'Dashboard',
      navigate: NavRoutes.Drawer,
    },
    {
      icon: Images.upcomingLeave,
      title: 'Upcoming leave',
      navigate: NavRoutes.UpcomingLeave,
    },
    {
      icon: Images.reports,
      title: 'Reports',
      data: [
        {
          title: 'In-Out Report',
          navigate: NavRoutes.InOutReport,
        },
        {
          title: 'Salary Report',
          navigate: NavRoutes.SalaryReport,
        },
        {
          title: 'Attendance Report',
          navigate: NavRoutes.AttendanceReport,
        },
      ],
    },
    {
      icon: Images.fuelApplication,
      title: 'Fuel Application',
      navigate: NavRoutes.FuelApplication,
    },
    {
      icon: Images.leaveApplication,
      title: 'Leave Application',
      navigate: NavRoutes.LeaveApplication,
    },
    {
      icon: Images.compensationApplication,
      title: 'Compensation Application',
      navigate: NavRoutes.CompensationApplication,
    },
  ],
  Home: {
    pieChartData: [
      {
        name: 'Present',
        employees: 0,
        key: 'totalPresent',
        color: Colors.chart.present,
      },
      {
        name: 'Absent',
        employees: 0,
        key: 'totalAbsent',
        color: Colors.chart.absent,
      },
      {
        name: 'Leave',
        employees: 0,
        key: 'totalLeave',
        color: Colors.chart.leave,
      },
      {
        name: 'Total',
        employees: 0,
        key: 'totalEmployee',
        color: Colors.chart.total,
      },
      {
        name: 'WFH',
        employees: 0,
        key: 'totalWorkFromHome',
        color: Colors.Black,
      },
    ],
  },
};

export default DummyData;
