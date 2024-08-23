function getResult(){

    let inputsValid = true;
    // check input values
    // const inputs = document.querySelectorAll('.data-group input');
    const inputs =  document.querySelectorAll('.data-group input:not([type="hidden"])');
    // console.log(inputs);
    inputs.forEach(input => {
        const inputValue = parseInt(input.value);
        if (inputValue > 30 || inputValue <0){
            inputsValid = false;
            alert(`${input.id} 數值大於30了，請再重新輸入`)
        }
    });
    if (inputsValid){
        const results = getInputs(inputs);
        generateTable(results);
    }
}
function getInputs(inputs){

    // function map
    const functionMap = {
        'origin': cal_origin,
        'mastery': cal_mastery,
        'enhance': cal_enhance,
        'common': cal_common,
    }
    const results = {}
    inputs.forEach(input => {
        const skillName = input.id;
        const skillValue = input.value;
        const skill_cate = skillName.split('-')[0];

        if (skill_cate in functionMap){
            const [need_sol, need_frag] = functionMap[skill_cate](Number(skillValue))
            results[skillName] = [need_sol, need_frag];
        }

    });
    // console.log(results);
    return results
}

function cal_origin(lvl){

    const arr_origin_solErda  = [5, 1, 1, 1, 2, 2, 2, 3, 3, 10, 3, 3, 4, 4,
         4, 4, 4, 4, 5, 15, 5, 5, 5, 5, 5, 6, 6, 6, 7, 20]
    const arr_origin_Fragments  = [100, 30, 35, 40, 45, 50, 55, 60, 65, 200, 
        80, 90, 100, 110, 120, 130, 140, 150, 160, 350, 170, 180,190, 200, 210, 220, 230, 240, 250, 500]
    
    need_sol = arr_origin_solErda.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    need_frags = arr_origin_Fragments.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    return [need_sol, need_frags];

}

function cal_mastery(lvl){

    const arr_mastery_solErda = [3, 1, 1, 1, 1, 1, 1, 2, 2, 5, 2, 2, 2, 2, 2, 2,
         2, 2, 3, 8, 3, 3, 3, 3, 3, 3, 3, 3, 4, 10]
    const arr_mastery_Fragments = [50, 15, 18, 20, 23, 25, 28, 30, 33, 100, 40,
         45, 50, 55, 60, 65, 70, 75, 80, 175, 85, 90, 95, 100, 105, 110, 115, 120, 125, 250]

    need_sol = arr_mastery_solErda.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    need_frags = arr_mastery_Fragments.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    return [need_sol, need_frags];

}

function cal_enhance(lvl){

    const arr_enhance_solErda = [4, 1, 1, 1, 2, 2, 2, 3, 3, 8, 3, 3, 3,
        3, 3, 3, 3, 3, 4, 12, 4, 4, 4, 4, 4, 5, 5, 5, 6, 15]
    const arr_enhance_Fragments = [75, 23, 27, 30, 34, 38, 42, 45, 49, 150,
        60, 68, 75, 83, 90, 98, 105, 113, 120, 263, 128, 135, 143, 150, 158, 165, 173, 180, 188, 375]

    need_sol = arr_enhance_solErda.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    need_frags = arr_enhance_Fragments.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    return [need_sol, need_frags];
}

function cal_common(lvl){

    const arr_common_solErda  = [7, 2, 2, 2, 3, 3, 3, 5, 5, 14, 5, 5, 6, 6, 6, 6,
        6, 6, 7, 17, 7, 7, 7, 7, 7, 9, 9, 9, 10, 20]
    const arr_common_Fragments  = [125, 38, 44, 50, 57, 63, 69, 75, 82, 300, 110, 124, 
        138, 152, 165, 179, 193, 207, 220, 525, 234, 248, 262, 275, 289, 303, 317, 330, 344, 750]
    
    need_sol = arr_common_solErda.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    need_frags = arr_common_Fragments.slice(lvl, 30).reduce((acc, num) => acc + num, 0);
    return [need_sol, need_frags];
}

function generateTable(results) {

    const tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = ''; // clear

    // create table
    const table = document.createElement('table');
    table.style.width = '100%';

    const headerRow = document.createElement('tr');
    const headerCell_title = document.createElement('th');
    headerCell_title.textContent = 'HEXA 技能';
    headerRow.appendChild(headerCell_title);

    const headerCell_sol = document.createElement('th');
    headerCell_sol.textContent = '所需氣息';
    headerRow.appendChild(headerCell_sol);

    const headerCell_frags = document.createElement('th');
    headerCell_frags.textContent = '所需碎片';
    headerRow.appendChild(headerCell_frags)

    table.appendChild(headerRow);

    //計算所需氣息和碎片
    var total_need_sol = 0;
    var total_need_frgas = 0

    Object.keys(results).forEach(key => {
        const row = document.createElement('tr');

        // key
        const keyCell = document.createElement('td');
        keyCell.textContent = key;
        row.appendChild(keyCell);

        // value for sol and frags
        results[key].forEach((value, index) => {
            const valueCell = document.createElement('td');
            valueCell.textContent = value;
            row.appendChild(valueCell);
            if (index === 0) {
                total_need_sol += value;
            } else if (index === 1) {
                total_need_frgas += value;
            }
        });

        //add into table
        table.appendChild(row);
    });

    const footRow = document.createElement('tr');
    const footCell_title = document.createElement('th');
    footCell_title.textContent = '結算';
    footRow.appendChild(footCell_title);

    const footCell_sol = document.createElement('th');
    footCell_sol.textContent = total_need_sol;
    footRow.appendChild(footCell_sol);

    const footCell_frags = document.createElement('th');
    footCell_frags.textContent = total_need_frgas;
    footRow.appendChild(footCell_frags);

    table.appendChild(footRow);

    /*
    var total_origin_solErda   = 150;
    var total_origin_Fragments = 4500;

    var total_enhance_solErda   = 492;
    var total_enhance_Fragments = 13532;

    var total_mastery_solErda   = 166;
    var total_mastery_Fragments = 4504;

    var total_common_solErda   = 208;
    var total_common_Fragments = 6268;

    total sol = 150 + 492 + 166 + 208 = 1016
    total frgas = 4500 + 13532 + 4504 + 6268 = 28804
    */
    const progressRow = document.createElement('tr');
    const progCell_title = document.createElement('th');
    progCell_title.textContent = '進度';
    progressRow.appendChild(progCell_title);

    const progCell_sol = document.createElement('th');
    const x = 1-(total_need_sol/1016)
    progCell_sol.textContent = `${(x * 100).toFixed(2)}%`;
    progressRow.appendChild(progCell_sol);

    const progCell_frgas = document.createElement('th');
    const y = 1 - (total_need_frgas / 28804);
    progCell_frgas.textContent = `${(y * 100).toFixed(2)}%`;
    progressRow.appendChild(progCell_frgas);

    table.appendChild(progressRow);

    tableContainer.appendChild(table);
}