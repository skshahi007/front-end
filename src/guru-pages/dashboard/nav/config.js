// component
import SvgColor from '../../../components/svg-color';

// icons
import questions_list from '../../../assets/icons/navbar/questions_list.svg'
import sets_list from '../../../assets/icons/navbar/sets_list.svg'
import homepage_icon from '../../../assets/icons/navbar/homepage_icon.svg'
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={name} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/guru/dashboard/app',
    icon: icon(homepage_icon),
  },
  {
    title: 'Standard Exams',
    path: '/guru/dashboard/Standard-exams',
    icon: icon(questions_list),
  },
  {
    title: 'Competitive Exams',
    path: '/guru/dashboard/competitive-exams',
    icon: icon(sets_list),
  },
  {
    title: 'Entrance Exams',
    path: '/guru/dashboard/entrance-exams',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/guru/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
