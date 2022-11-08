// import fetch from "node-fetch";
function call_all_students() {
    fetch('http://localhost:3000/api/findall')
        .then( (response) => response.json())
        .then( (data) => {
            if ($('.student').length) {
                $('.list-students').html('');
            }
            for (let i = 0; i < data.length; i++) {
                let bdate = new Date(data[i].Birthday)
                let html_string = '<tr class="student">'
                                    + '<th scope="row">' + data[i].StudentId + '</th>'
                                    + '<td>' + data[i].Name + '</td>'
                                    + '<td>' + data[i].Roll + '</td>'
                                    + '<td>' + bdate.toISOString().split('T')[0] + '</td>'
                                    + '<td> <button id="' + data[i]._id + '" type="button" class="btn btn-danger borrar_student">Borrar</button> </td>'
                                    + '<td> <button id="' + data[i]._id + '" type="button" class="btn btn-warning editar_student">Editar</button> </td>'
                                + '</tr>';

                $('.list-students').append(html_string);
            }
    });
}

$(document).ready( () => {

    call_all_students();

    $('.btn-agregar').on('click', () => {
        let data = {
            StudentId: $('#studentIdInput').val(),
            Name: $('#nameInput').val(),
            Roll: parseInt($('#rol-Options').find(":selected").val()),
            Birthday: new Date($('#birthdayInput').val()),
        };

        if ($('#operacion').val() == "ingresar") {
            fetch('http://localhost:3000/api/save', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
                })
                .then( (response) => response.json())
                .then( (data) => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        console.log(data.msj);
                        location.reload(true);
                    }
                });
        } else {
            data['id'] = $('.id_editar').attr('id');
            fetch('http://localhost:3000/api/update', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
                })
                .then( (response) => response.json())
                .then( (data) => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        console.log(data.msj);
                        location.reload(true);
                    }
                });
        }
    })

    

    $('.call-all-button').on('click', () => {
        call_all_students();
    })

    $('.call-one-button').on('click', () => {
        let data = {student_id: 110};
        fetch('http://localhost:3000/api/findfirst', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then( (response) => response.json())
            .then( (data) => {
                let bdate = new Date(data.Birthday)
                let html_string = '<tr class="student">'
                                    + '<th scope="row">' + data.StudentId + '</th>'
                                    + '<td>' + data.Name + '</td>'
                                    + '<td>' + data.Roll + '</td>'
                                    + '<td>' + bdate.toISOString().split('T')[0] + '</td>'
                                    + '<td> <button id="' + data._id + '" type="button" class="btn btn-danger borrar_student">Borrar</button> </td>'
                                    + '<td> <button id="' + data._id + '" type="button" class="btn btn-warning editar_student">Editar</button> </td>'
                                + '</tr>';

                $('.list-students').html(html_string);
            });
    })

    $(document).on('click', '.borrar_student', (e) => {
        let data = {student_id: e.target.id};
        fetch('http://localhost:3000/api/delete', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then( (response) => response.json())
            .then( (data) => {
                console.log(data);
                location.reload(true);
        });
    });
    
    $(document).on('click', '.editar_student', (e) => {
        let data = {student_id: e.target.id};
        fetch('http://localhost:3000/api/findone', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then( (response) => response.json())
            .then( (data) => {
                let bdate = new Date(data.Birthday)
                $('.id_editar').attr('id', data._id);
                $('#studentIdInput').val(data.StudentId);
                $('#nameInput').val(data.Name);
                $('#rol-Options option[value="'+data.Roll+'"]').attr("selected","selected");
                $('#birthdayInput').val(bdate.toISOString().split('T')[0]);
                $('.operacion').attr('id','editar');
            });
    });
})