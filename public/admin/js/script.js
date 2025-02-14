// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if(status){
                url.searchParams.set("status",status);
             } else {
               url.searchParams.delete("status");
            }
        window.location.href = url.href;
        });
    });
} 

// End Button Status

// form search // 
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) =>{
        e.preventDefault(); // ngăn chặn sự kiện mặc định , đỡ load lại trang 

        const keyWord = e.target.elements.keyword.value
        if(keyWord){
            url.searchParams.set("keyWord",keyWord);
        } else {
            url.searchParams.delete("keyWord");
        }
        window.location.href = url.href;  
        
         
        
    });
}
//end form search // 

// pagination //

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button =>{
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            
            url.searchParams.set("page",page);
            window.location.href = url.href;
        });
    });
}
//end pagination //

//checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");// lấy ra 1 mảng table luôn
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']"); // lấy ra thuộc tính của ô đại diện
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']"); // lấy ra các thẻ của sản phẩm 

    inputCheckAll.addEventListener("click", () => {
        //console.log(inputCheckAll.checked); // khi tích vào ô sẽ trả ra key là true or false
        if(inputCheckAll.checked){
            inputsId.forEach(input =>{
                input.checked = true;
            });
        } else {
            inputsId.forEach(input =>{
                input.checked = false;
            });
        }
    });

    inputsId.forEach(input =>{
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length; // :checked để đếm xem đã có bao nhiêu ô đã tích rồi , .length hiển thị số ô đã checkedbox
            //console.log(countChecked);
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            } else{
                inputCheckAll.checked = false;
            }
        });
    });

}
//end checkbox-multi

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]"); // lấy ra cả một mảng table
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{   // khi có sự kiện submit thì khi ấn vào nút áp dụng mới hiển thị những câu lệnh bên trong nó vdu consol.log...

        e.preventDefault();
        
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        //console.log(inputsChecked);

        // xóa nhiều sản phẩm 
        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all"){
            const isConfirm = confirm(" bạn có chắc muốn xóa những sản phẩm này ?")
            
            if(!isConfirm){
                return;
            }
        }
        
        
        // đoạn này lấy ra id của từng sản phẩm
        if(inputsChecked.length > 0){
            let ids = [];

            const inputsId = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id); // push để thêm từng phần tử id vào trong mảng ids
            });

            inputsId.value = ids.join(","); // chuyển từ dạng string về dạng text để dùng cho value
            formChangeMulti.submit(); // sẽ link sang đường dẫn bởi action
        }  else{
            alert("vui lòng chọn ít nhất một bản ghi !");
        }

    });

}
//end forn change multi
