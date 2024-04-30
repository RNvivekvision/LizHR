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
        },
        {
          title: 'Salary Report',
        },
        {
          title: 'Attendance Report',
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
  upcomingLeaves: {
    employeeLeaves: [
      {
        employee: 'Lillian Leonard (25)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Eric Ryan (12)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
      {
        employee: 'Alan Hopkins (48)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Willie McCormick (24)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
      {
        employee: 'Myra Wright (5)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Beatrice Robertson (36)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
      {
        employee: 'Noah Moss (78)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Elizabeth Brewer (42)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
      {
        employee: 'Vernon McKenzie (125)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Etta Gregory (107)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
      {
        employee: 'Helena Evans (102)',
        leaveType: 'Unpaid Leave (UP)',
        approveBy: 'Claudia Wells (145)',
        fromDate: '19 - Apr - 2024',
        toDate: '19 - Apr - 2024',
      },
    ],
  },
};

export default DummyData;
