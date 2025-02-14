module.exports  = (query) => {
    let filterStatus = [
        {
            name : " Tất cả",
            status: "",
            class: ""
        },
        {
            name : " Hoạt động",
            status: "active",
            class : ""
        }, 
        {
            name : "Dừng hoạt động",
            status: "inactive",
            class : ""
        }
    ];

    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);   // tìm vị trí bản ghi với 1 điều kiện
        //console.log(index);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");   // tìm vị trí bản ghi với 1 điều kiện
        filterStatus[index].class = "active";
    }
    return filterStatus ;
}