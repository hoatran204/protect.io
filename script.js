// load html => load js => thuc thi

class User {
  constructor(id, name, price, infor) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.infor = infor;
  }
}
class App {
  renderUser(users) {
    let userTableTbody = document.querySelector('#tbody');
    let userTableBodyHtml = '';
    for (let user of users) {
      userTableBodyHtml += `<tr id="row${user.id}">
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.price}</td>
          <td>${user.infor}</td>
          <td>
            <button class="btn btn-edit" data-id="${user.id}">Edit</button>
            <button class="btn btn-delete" data-id="${user.id}" >Delete</button>
          </td>
        </tr>`;
    }
    userTableTbody.innerHTML = userTableBodyHtml;
    initsDeleteHandle();
  }
}

let users = [];
let app = new App();
app.renderUser(users);

let submitBtn = document.querySelector('#submit');
let editBtns = document.querySelectorAll('.btn-edit');

let nameEl = document.querySelector('#name');
let priceEl = document.querySelector('#price');
let inforEl = document.querySelector('#infor');
let editId = '';

class ValidateInput {
  constructor(formData) {
    this.formData = formData;
    this.errors = [];
  }

  require(mess = 'khong duoc de trong') {
    for (const [key, value] of this.formData.entries()) {
      console.log(key, value);
      if (!Boolean(value)) {
        // true
        let errorMess = `${key} ${mess}`;
        this.errors.push([key, errorMess]);
      }
    }
    return this.errors;
  }
}

submitBtn.addEventListener('click', function () {
  if (editId) {
    let userEditIndex = users.findIndex((item) => item.id == editId);
    let userEdit = users[userEditIndex];
    userEdit.name = nameEl.value;
    userEdit.price = priceEl.value;
    userEdit.infor = inforEl.value;
    app.renderUser(users);
    resetForm();
    // clear
  } else {
    let id = parseInt(Math.random() * 100);

    let formData = new FormData(document.querySelector('#form-data'));

    let errors = new ValidateInput(formData).require('ban nen nhap');
    resetError();
    if (errors.length > 0) {
      for (let [key, mess] of errors) {
        document.querySelector(`.error-${key}`).innerHTML = mess;
      }
      return;
    }

    let userCreate = new User(id, nameEl.value, priceEl.value, inforEl.value);
    users.push(userCreate);
    app.renderUser(users);
    resetForm();
  }
});
function resetError() {
  document.querySelectorAll('.error').forEach((item) => (item.innerHTML = ''));
}
function resetForm() {
  nameEl.value = '';
  priceEl.value = '';
  inforEl.value = '';
  editId = '';
}

editBtns.forEach((item) => {
  item.addEventListener('click', function () {
    editId = this.getAttribute('data-id');
    let userEditIndex = users.findIndex((item) => item.id == editId);
    let userEdit = users[userEditIndex];
    nameEl.value = userEdit.name;
    priceEl.value = userEdit.price;
    inforEl.value = userEdit.infor;
  });
});

function initsDeleteHandle() {
  let deleteBtns = document.querySelectorAll('.btn-delete');
  deleteBtns.forEach((item) => {
    item.addEventListener('click', function () {
      let isDelete = confirm('xac nhan xoa');
      if (isDelete) {
        let id = item.getAttribute('data-id'); // lay id
        let userIndex = users.findIndex((item) => item.id == id); // lay vi tri
        console.log(users);
        users.splice(userIndex, 1); // xoa 1 phan tu trong mang bat dau tu vi tri
        console.log(users);
        // document.querySelector(`#row${id}`).remove();
        app.renderUser(users); // hien thi lai danh sach
      }
    });
  });
}
