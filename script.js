'use strict';
/*form inputs decleration (first name, last name, username, password, password 2)*/

const users = new Array();
let currentpassword = [String(''), String('')];
const firstname = document.querySelector('.FIRSTNAME');
const firstnameerror = document.querySelector('.FIRSTNAMEERROR');
const lastname = document.querySelector('.LASTNAME');
const lastnameerror = document.querySelector('.LASTNAMEERROR');
const username = document.querySelector('.USERNAME');
const usernameerror = document.querySelector('.USERNAMEERROR');
const password = document.querySelector('.PASSWORD');
const password2 = document.querySelector('.PASSWORD2');
const passworderror = document.querySelector('.PASSWORDERROR');
const hint = document.querySelector('.HINT');
const signup = document.querySelector('.SIGNUP');

const logparameters = function () {
  console.clear();
  console.log(`INPUT FIRST NAME: ${firstname.value}
  ERROR FIRST NAME: ${firstnameerror.textContent}
  VALIDATION FIRST NAME:${0}
  INPUT LAST NAME: ${lastname.value}
  ERROR LAST NAME: ${lastnameerror.textContent}
  VALIDATION LAST NAME: ${0}
  INPUT USERNAME: ${username.value}
  ERROR USERNAME: ${usernameerror.textContent}
  VALIDATION USERNAME: ${0}
  INPUT PASSWORD: ${password.value}
  INPUT PASSWORD2: ${password2.value}
  ERROR PASSWORD: ${passworderror.textContent}
  VALIDATION PASSWORDS: ${0}
  SAVED PASSWORD: ${currentpassword[0]}
  SAVED PASSWORD2: ${currentpassword[1]}`);
};

firstname.addEventListener('input', function (e) {
  const validfirstname = firstname.value
    .slice()
    .toLowerCase()
    .split('')
    .every(sign => (sign >= 'a' && sign <= 'z' ? true : false));
  firstnameerror.textContent = validfirstname
    ? firstname.value.length < 5
      ? 'must be at least 5 letters'
      : ''
    : `must include only letters 'a' to 'z'`;
});
lastname.addEventListener('input', function (e) {
  const validlastname = lastname.value
    .slice()
    .toLowerCase()
    .split('')
    .every(sign => (sign >= 'a' && sign <= 'z' ? true : false));
  lastnameerror.textContent = validlastname
    ? lastname.value.length < 5
      ? 'must be at least 5 letters'
      : ''
    : `must include only letters 'a' to 'z'`;
});
username.addEventListener('input', function (e) {
  const validusername = username.value
    .slice()
    .toLowerCase()
    .split('')
    .every(sign => (sign >= 'a' && sign <= 'z' ? true : false));
  usernameerror.textContent = validusername
    ? username.value.length < 5
      ? 'must be at least 5 letters'
      : ''
    : `must include only letters 'a' to 'z'`;
});

/*empty all form inputs */
const clearform = function () {
  firstname.value = '';
  firstnameerror.textContent = `First name must include at least 3 letters from 'A' to 'Z'`;
  lastname.value = '';
  lastnameerror.textContent = `Last name must include at least 3 letters from 'A' to 'Z'`;
  username.value = '';
  usernameerror.textContent = `Username must include at least 5 letters from 'A' to 'Z'`;
  password.value = '';
  password2.value = '';
  passworderror.textContent = `Passwords must include at least 5 letters from 'A' to 'Z' and number '0' to '9'`;
  currentpassword[0] = currentpassword[1] = 0;
};
clearform();
//begin of users refference database
const Users = function () {
  const user1 = {
    type: 'Manager',
    FirstName: 'GADI',
    LastName: 'WUNSCH',
    UserName: 'GadiKing',
    Password: '1111',
  };
  const user2 = {
    type: 'Manager',
    FirstName: 'SHAY',
    LastName: 'ROSENTHAL',
    UserName: 'ShayPrince',
    Password: '2222',
  };
  const user3 = {
    type: 'Player',
    FirstName: 'DAR',
    LastName: 'HERSH',
    UserName: 'DarJoker',
    Password: '3333',
  };

  users.push(user1);
  users.push(user2);
  users.push(user3);
};
Users();
/*show the existed usernames*/
const updateHint = function () {
  const userlist = users.map(user => user.UserName).join(' , ');
  hint.textContent = `This is users list: ${userlist}
...input details and...CLICK HERE`;
};
updateHint();
//end of users refference database
/*Create managers array from database*/
const managers = users.filter(user => user.type === 'Manager');
/*Create Players array from database*/
const players = users.filter(user => user.type === 'Player');
/*Check*/ //console.log(managers.map(manager => manager.UserName));
/*CHeck*/ //console.log(players.map(player => player.UserName));
//Add new user function
const newUser = function (details, type) {
  /*Check*/ //console.log(users);
  /*Check*/ //console.log(details.UserName);

  let userX = {
    type: type,
    FirstName:
      details.FirstName[0]?.toUpperCase() +
      details.FirstName?.slice(1).toLowerCase(),
    LastName:
      details.LastName[0]?.toUpperCase() +
      details.LastName?.slice(1).toLowerCase(),
    UserName: details.UserName,
    Password: details.Password,
  };
  //userX.LastName[0] = userX.LastName[0].toUpperCase();
  type === 'Manager' ? managers.push(userX) : '';
  type === 'Player' ? players.push(userX) : '';
  users.push(userX);
  updateHint();
  clearform();
};
//New user details
const SignIn = {
  type: 'player',
  FirstName: '',
  LastName: '',
  UserName: '',
  Password: '',
};

/*check valid 'a' to 'z' letters and numbers*/
const legalnote = notes =>
  notes
    .split('')
    .every(
      note =>
        (note >= 'a' && note <= 'z') ||
        (note >= 'A' && note <= 'Z') ||
        (Number(note) >= 0 && Number(note) <= 9 && note !== ' ')
    )
    ? ''
    : `Password must contain only letters 'A'-'Z' 'a'-'z' ,and numbers '0'-'9'`;
/*Hides password typing and */
const hidepassword = function (password, i) {
  passworderror.textContent = '';
  currentpassword[i] = password.value;

  /*check similar passwords */
  passworderror.textContent =
    currentpassword[0] === '' && currentpassword[1] === ''
      ? `Password must contain only letters 'A'-'Z' 'a'-'z' ,and numbers '0'-'9'`
      : currentpassword[0] !== currentpassword[1]
      ? (passworderror.textContent = 'passwords are not similar')
      : (passworderror.textContent = '');
  const legal1 = currentpassword[0] ? legalnote(currentpassword[0]) : '';
  const legal2 = currentpassword[1] ? legalnote(currentpassword[1]) : '';
  passworderror.textContent = legal1 || legal2 || passworderror.textContent;

  passworderror.textContent =
    passworderror.textContent ||
    (currentpassword[i].split('').some(note => note >= 'a' && note <= 'z') &&
    currentpassword[i].split('').some(note => note >= 'A' && note <= 'Z') &&
    currentpassword[i].split('').some(note => note >= '0' && note <= '9')
      ? currentpassword[i].length < 6
        ? 'Password length must be at least 6'
        : ''
      : 'Password must include at least one uppercase letter one lowercase leter and one digit');
};
password.addEventListener('input', function () {
  hidepassword(password, 0);
});
password2.addEventListener('input', function () {
  hidepassword(password2, 1);
});

signup.addEventListener('click', function (e) {
  e.preventDefault();
  SignIn.FirstName = firstname.value;
  SignIn.LastName = lastname.value;
  SignIn.UserName = username.value;
  SignIn.Password = currentpassword[0];
  !Boolean(firstnameerror.textContent) &&
  !Boolean(lastnameerror.textContent) &&
  !Boolean(usernameerror.textContent) &&
  !Boolean(passworderror.textContent) &&
  currentpassword[0] === currentpassword[1]
    ? users
        .map(user => user.UserName)
        .find(user => user.toLowerCase() === SignIn.UserName.toLowerCase())
      ? alert('Username is exist')
      : newUser(SignIn, 'Player')
    : (hint.textContent = 'SOME OF THE INPUTS ARE NOT VALID');
});
