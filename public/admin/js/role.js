// permission
const tablePermission = document.querySelector("[table-permission]") // lấy ra cái bảng
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        let permission = []; 

        const rows = tablePermission.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permission.push({
                        id: id,
                        permission : []
                    });
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;

                   if(checked){
                    permission[index].permission.push(name);
                    }

                })
            };
    
        });
        console.log(permission)
        if(permission.length > 0){
            const formChangePermission = document.querySelector("#form-change-permission");
            const inputPermission = formChangePermission.querySelector("input[name='permission']");
            inputPermission.value = JSON.stringify(permission);  // input cần 1 chuỗi mà permission là 1 mảng 
            formChangePermission.submit();
        }

    });
}
// End permission

// permission data defaul
const dataRecord = document.querySelector("[data-record]");
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"));
    const tablePermission = document.querySelector("[table-permission]");
    console.log(record)
    record.forEach((record, index )=> {
        const permission = record.permissions ; // mảng trong mảng
            // lọc từng phần tử của mảng đó
            permission.forEach(permission => {
                console.log(permission);
                const row = tablePermission.querySelector(`[data-name="${permission}"]`); // lấy ra hàng mà có data-name tên là ...
                const input = row.querySelectorAll("input")[index]; // lấy ra vị trí ô đã tích

                input.checked = true; 
            })
    })
};
// end permission data defaul