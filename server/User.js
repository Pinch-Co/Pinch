const users = [
  {
    id: '1',
    firstName: 'Maurice',
    lastName: 'Moss',
    phone: '',
    email: 'm@moss.com',
    password: 'abcdefg',
  },
  {
    id: '2',
    firstName: 'Roy',
    lastName: 'Trenneman',
    phone: '',
    email: 'roy@trenneman.com',
    password: 'imroy',
  },
  {
    id: '3',
    firstName: 'Sugma',
    lastName: 'Trenneman',
    phone: '',
    email: 'sugma@gmail.com',
    password: 'ligma',
  },
  {
    id: '4',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    phone: '',
    email: 'seventhHokage@gmail.com',
    password: 'hey',
  },
];

module.exports = {
  getUsers: () => users,
  addUser: (user) => users.push(user),
};
