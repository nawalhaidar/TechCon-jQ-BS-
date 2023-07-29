$('document').ready(function(){

    let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ', 'maj','status','id'];

    const storedData=localStorage.getItem('myData');
    const displayArray=JSON.parse(storedData);

    let count=1;
    displayArray.forEach(item => {
        let row = $('<tr>');
        row.append($('<th>').text(count++));
        for(let i=0;i<9;i++){
            row.append($('<td>').text(item[keys[i]]));
        } 
        row.append($('<td style="display:none">').text(item.id));
      $('tbody').append(row);
    });


    $('.btn.options').click(function() {
        $('.collapse.show').collapse('hide');
        $($(this).data('target')).collapse('show');
    });


})
