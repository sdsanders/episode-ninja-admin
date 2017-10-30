export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Shows',
      icon: 'icon-screen-desktop',
      children: [
        {
          name: 'All Shows',
          url: '/shows',
          icon: 'icon-list'
        },
        {
          name: 'Add New',
          url: '/shows/add',
          icon: 'icon-plus'
        }
      ]
    }
  ]
};
