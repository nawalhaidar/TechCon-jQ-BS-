$('document').ready(function(){

    let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ', 'maj','status'];


    if(!localStorage.getItem('count')){
        localStorage.setItem('count',0);
    }

    $('#birthdate').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        maxDate: new Date(2004,0,1),
        dateFormat: 'dd-mm-yy',
        defaultDate: '-20y',
    });

    $('#discoverRow').on('click',function(){
        $('#hiddenSpeakers').slideDown(function(){
            $('#hiddenSpeakers').css('display','flex');
        });
        $('#discoverRow').hide(function() {
            $(this).removeClass('d-flex');
        });
        $('#showLess').removeClass('d-none');
        $('#showLess').addClass('d-flex');
    })

    $('#showLess').on('click',function(){
        $('#hiddenSpeakers').slideUp(function(){
            $('#hiddenSpeakers').css('display','none');
        });
        $('#discoverRow').show(function() {
            $(this).addClass('d-flex');
          });
        $('#showLess').removeClass('d-flex');
        $('#showLess').addClass('d-none');
    })

    let nameRules={
        required: true,
            minlength: 2,
            maxlength: 50,
            // pattern: /^[A-Za-z\s]+$/
    };
    let eduRules={
        minlength: 2,
        maxlength: 50,
    }
    let nameMessages={
        required: "Please fill this field.",
        minlength: "First name must be at least 2 characters.",
        maxlength: "First name must not exceed 50 characters.",
        pattern: "First name must contain only letters and spaces."
    };
    $("#myForm").validate({
        rules:{
            fname: nameRules,
            lname: nameRules,
            email:{
                required: true,
                email:true
            },
            phone:{
                digits: true
            },
            uni: eduRules,
            major: eduRules

        },
        messages: {
            fname: nameMessages,
            lname: nameMessages,
            email: {
              required: 'Please enter your email.',
              email: 'Please enter a valid email address.'
            },
            phone:{
                digits: 'Please enter digits only'
            },
            uni: nameMessages,
            major: nameMessages
        },
        submitHandler: function(form) {
        
            let count=parseInt(localStorage.getItem('count'))+1;
            localStorage.setItem('count',count);

            let data={
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                email: $('#email').val(),
                gender: $('.form-check-input:checked').val(),
                phone: $('#phone').val(),
                birthdate: $('#birthdate').val(),
                univ: $('#uni').val(),
                maj: $('#major').val(),
                status: '',
                motivation: $('#motive').val(),
                id: count
            }

            for(let i=3; i<keys.length;i++){
                if(!data[keys[i]])
                data[keys[i]]='-';
            }

            let storedData=localStorage.getItem('myData');
            let dataArray=[];
            if(storedData)
                dataArray=JSON.parse(storedData);
            dataArray.push(data);
            localStorage.setItem('myData',JSON.stringify(dataArray));

            $('#insertName').text(data.fname);

            $('#newReg').on('click',function(){
                $('#myForm :input').val('');
                $('input[name="gender"]').prop('checked', false);
                $('#staticBackdrop').modal('hide');

            })
            $('#staticBackdrop').modal('show');

        }
    });

    $('#displayButton').on('click',function(){
        $('#myForm2 :input').val('');
        $('#staticBackdrop2').modal('show');

        $.validator.addMethod('login',function(value, element){
            let username= $('#username').val();
            let password= $('#password').val();
            return (username==='nawalhaidar' && password==='P@55W0RD');
        },"Invalid username or password.")

        $('#myForm2').validate({
            rules:{
                username: {
                    required: true,
                    login: true
                },
                password: {
                    required: true,
                    login: true
                }
    
            },
            messages: {
                username: {
                  required: 'Please enter your username.',
                
                },
                password:{
                    required: 'Please enter your password.',
            
                }
            },
            // errorPLacement: function(error, element){
            //     if(error.val()==="Invalid username or password."){
            //         $('#loginRow').after(error);
            //     }
            // },
            submitHandler: function(){
                window.location.href='display.html';
            }
        })
        
    })

})

