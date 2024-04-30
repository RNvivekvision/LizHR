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
      navigate: NavRoutes.UpcomingLeaves,
    },
    {
      icon: Images.reports,
      title: 'Reports',
      data: [
        {
          icon: Images.fuelApplication,
          title: 'Inner 1',
        },
        {
          icon: Images.leaveApplication,
          title: 'Inner 2',
        },
        {
          icon: Images.compensationApplication,
          title: 'Inner 3',
        },
      ],
    },
    {
      icon: Images.fuelApplication,
      title: 'Fuel Application',
    },
    {
      icon: Images.leaveApplication,
      title: 'Leave Application',
    },
    {
      icon: Images.compensationApplication,
      title: 'Compensation Application',
    },
  ],
  Home: {
    attendenceSummary: [
      { pecentage: 80, title: 'Total Attendance', color: Colors.attendence },
      { pecentage: 70, title: 'Total Present', color: Colors.present },
      { pecentage: 50, title: 'Total Absent', color: Colors.absent },
    ],
    branches: [
      { label: 'Digital Vally Branch', value: 'Digital Vally Branch' },
      { label: 'VIP Road Branch', value: 'VIP Road Branch' },
      { label: 'Adajan Branch', value: 'Adajan Branch' },
      { label: 'Pal Branch', value: 'Pal Branch' },
    ],
    years: [
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' },
      { label: '2022', value: '2022' },
      { label: '2021', value: '2021' },
      { label: '2020', value: '2020' },
      { label: '2019', value: '2019' },
      { label: '2018', value: '2018' },
      { label: '2017', value: '2017' },
      { label: '2016', value: '2016' },
      { label: '2015', value: '2015' },
    ],
    employeeData: [
      {
        icon: Images.present,
        title: 'Total Present',
        employee: '25',
        wfh: '2',
      },
      {
        icon: Images.absent,
        title: 'Total Absent',
        employee: '04',
        wfh: '0',
      },
      {
        icon: Images.halfLeave,
        title: 'Total Half Leave',
        employee: '02',
        wfh: '0',
      },
      {
        icon: Images.overtime,
        title: 'Total Overtime',
        employee: '10',
        wfh: '1',
      },
      {
        icon: Images.upcomingLeaveHome,
        title: 'Upcoming Leave',
        employee: '06',
      },
      {
        icon: Images.missThumb,
        title: 'Miss Thumb',
        employee: '02',
      },
    ],
  },
};

export default DummyData;
