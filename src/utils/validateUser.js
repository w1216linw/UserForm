const validateUser = (user) => {
  for(const field in user) {
    if(user[field] === '') {
      return {error : {
        field: field,
        message: `Empty ${field}`
      }}
    }

    if(field === 'email' && !(user[field]).includes('@') ) {
      return{
        error: {
          field: field,
          message: `Invalid ${field}`
        }
      }
    }
  }
}

export default validateUser;