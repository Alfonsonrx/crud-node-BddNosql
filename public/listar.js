// import fetch from "node-fetch";

$(document).ready( () => {
    $('.call-all-button').on('click', () => {
        fetch('http://localhost:3000/api/findall')
            .then( (response) => response.json())
            .then( (data) => {
                for (let i = 0; i < data.length; i++) {
                    let bdate = new Date(data[i].Birthday)
                    let html_string = '<div class="student">'
                                        + '<h2>' + data[i].Name + '</h2>'
                                        + '<h3> Id:' + data[i].StudentId + '</h3>'
                                        + '<h3>' + bdate.toISOString().split('T')[0] + '</h3>'
                                    + '</div>';

                    $('.list-students').html(html_string);
                }
            });
    })
    $('.call-one-button').on('click', () => {
        var data = {student_id: 101}
        fetch('http://localhost:3000/api/findfirst', {
                method: 'POST',
                body: JSON.stringify( data ) 
            })
            .then( (response) => response.json())
            .then( (data) => {
                let bdate = new Date(data.Birthday)
                let html_string = '<div class="student">'
                                    + '<h2>' + data.Name + '</h2>'
                                    + '<h3> Id:' + data.StudentId + '</h3>'
                                    + '<h3>' + bdate.toISOString().split('T')[0] + '</h3>'
                                + '</div>';

                $('.list-students').html(html_string);
            });
    })
})