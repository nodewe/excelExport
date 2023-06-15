export default worksheet=>{
    console.log(worksheet,'worksheet')
    const cellStyle = {
        font:{
            sz:16,
            bold:true
        }
    };

    const cells = ['A','B','C','D'];
    worksheet['!cols'] = Array.from({length:cells.length},()=>({wch:50}))

    // 设置样式的范围
    // const range = utils.decode_range(ws['!ref']);
    for (const cell of cells) {
        worksheet[`${cell}1`].s = cellStyle
    }
}
