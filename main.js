window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/d1ce48d8c9c346489ea53f34f58a3d8e/userData')
        .then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                showUserOnHome(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
let updating = null;

function submitForm(event) {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let mobile = event.target.mobile.value;

    user = {
        name: name,
        email: email,
        mobile: mobile
    }

    if (updating === null) {
        axios.post('https://crudcrud.com/api/d1ce48d8c9c346489ea53f34f58a3d8e/userData', user)
            .then((response) => {
                showUserOnHome(response.data);
                // console.log(response);
            })
            .catch((error) => {
                document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>';
            })
    }
    else {
        let url1 = 'https://crudcrud.com/api/d1ce48d8c9c346489ea53f34f58a3d8e/userData/' + updating;
        axios.put(url1, user)
            .then((response) => {
                showUserOnHome(response.data);
                location.reload();
            })
            .catch((error) => {
                document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>';
                console.log('Something Went Wrong', error);
            })
    }
}

// function editUser(user) {
//     document.getElementById('name').value = user.name;
//     document.getElementById('email').value = user.email;
//     document.getElementById('mobile').value = user.mobile;
//     updating = user._id;

// }

function showUserOnHome(user) {
    let parentEle = document.getElementById('userList');
    let childEle = document.createElement('li');
    childEle.id = 'addedUser';
    childEle.innerText = user.name + '-' + user.email + '-' + user.mobile;

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = () => {
        let item_id = user._id;
        axios.delete(`https://crudcrud.com/api/d1ce48d8c9c346489ea53f34f58a3d8e/userData/${item_id}`)
            .then((response) => {
                // console.log(user)
                parentEle.removeChild(childEle);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';

    editBtn.onclick = () => {
        parentEle.removeChild(childEle);
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('mobile').value = user.mobile;
        updating = user._id;
    }



    childEle.appendChild(editBtn);
    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);
}