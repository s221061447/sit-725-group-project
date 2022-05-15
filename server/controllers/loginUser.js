var axios = require('axios');
const { default: Swal } = require('sweetalert2');

module.exports = (req, res) => {
    const { email, password, role } = req.body;
    // console.log( {
    //     "email": email,
    //     "password": password,
    //     "role": role
    // })

    axios.post('http://localhost:8000/auth/login',
        {
            "email": email,
            "password": password,
            "role": role
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            req.session.user = response.data;
            Swal.fire('Success');
            return res.redirect("/dashboard");
        })
        .catch(error => {
            console.error(error)
            // swal( "Oops!" ,  "Something went wrong!" ,  "error" )
            return res.redirect("/login");
        });
}