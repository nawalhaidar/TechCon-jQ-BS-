$('document').ready(function(){

    let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ','maj','status','id'];

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

    //Note: I could have used the Tabs widget in jQuery UI instead of the collapsible bootstrap
    $('.btn.options').click(function() {
        $('.collapse.show').collapse('hide');
        $($(this).data('target')).collapse('show');
    });
    
    // Data Management Options 
    
    $('#reset').click(function(){
        window.location.href='display.html';
    });

    $('#filterButton').click(function(event){
        event.preventDefault();
        let gender=$('#filterGenderOptions').val();
        let status=$('#filterStatusOptions').val();
        if(status!=='any'){
            $('table tbody tr:not(:contains("'+status+'"))').remove();
        }
        if(gender!=='any'){
            $('table tbody tr:not(:contains("'+gender+'"))').remove();
        }
        updateNumbers();
    });
    $('#sortButton').click(function(event){
        event.preventDefault();
        let rows = $('table tbody tr').get();
        let order=$('#order').val();
        let sortBy=$('#sortBy').val();
        console.log(sortBy);
        let keyIndex=keys.indexOf(sortBy);
        if(keyIndex==8) keyIndex++;

        rows.sort(function(a, b) {
            let aValue = $(a).find('td').eq(keyIndex).text();
            let bValue = $(b).find('td').eq(keyIndex).text();

            if(sortBy==='fname' || sortBy==='lname'){
                if(order=='descending')
                    return bValue.localeCompare(aValue);
                return aValue.localeCompare(bValue);
            }
            if(sortBy==="id"){
                aValue=parseInt(aValue);
                bValue=parseInt(bValue);
                if(order=='descending'){
                    return (aValue < bValue)-1;
                }
                return (aValue > bValue)-1;
            }
            if(sortBy=='birthdate'){
                function compareDates(date1, date2){
                    let day1=date1.slice(0,2);
                    let month1=date1.slice(3,5);
                    let year1=date1.slice(6,10);
                    let day2=date2.slice(0,2);
                    let month2=date2.slice(3,5);
                    let year2=date2.slice(6,10);
        
                    if(year1>year2 || (year1===year2 && month1>month2)||(year1===year2 && month1===month2 && day1>day2)){
                        return 1;
                    }
                    else
                        return -1;
                    
                }
                if(order=='descending')
                return compareDates(bValue,aValue);
                return compareDates(aValue,bValue);

            }
            updateNumbers();
        });


        $.each(rows, function(index, row) {
            $('table tbody').append(row);
        });
        updateNumbers();
    });

    $('#searchButton').click(function(event){
        event.preventDefault();
        let searchBy=$('#searchBy').val();
        let keyIndex=keys.indexOf(searchBy);
        let searchVal=$('#searchValue').val().toLowerCase();
        $('table tbody tr').each(function(){
            if(!($(this).find('td').eq(keyIndex).text().toLowerCase().includes(searchVal))){
                $(this).remove();
            }
        })
        updateNumbers();
    });

    function updateNumbers(){
        let rows=$('table tbody tr');
        let count=1;
        rows.each(function(){
            $(this).find('th').text(count++);
        });
    }

});
