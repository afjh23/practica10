const addNewUser = document.querySelector('#addNewUser')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('.close')
const userTable = document.querySelector('#userTable')

allUsers()
function showDOM (users) {
  userTable.innerHTML = '',
  users.forEach((user, i) => {
    const rowTemplate = `
    <tr>
         <td id=${user.user_id}>${i + 1}</td>
      <td>${user.nombre}</td>
      <td>${user.email}</td>
      <td>${user.role_id}</td>
      <td><img src='../uploads/${user.imagen_perfil}' alt="${user.imagen_perfil}"></td>
      <td>
          <button>Edit</button>
          <button>Delete</button>
      </td>
     </tr>`
    userTable.innerHTML += rowTemplate
  })
}
async function allUsers () {
  try {
    const response = await fetch('/api/users')
    const users = await response.json()
    console.log(users)
    showDOM(users)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

addNewUser.addEventListener('click', (e) => { modal.style = 'display:flex' })
closeBtn.addEventListener('click', (e) => { modal.style = 'display: none' })
