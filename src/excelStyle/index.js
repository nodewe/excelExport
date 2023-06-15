export default worksheet=>{
    console.log(worksheet,'worksheet')
    const cellStyle =  {
        //字体属性
        font:{
            sz:16,
            bold:true,
            color:{
              rgb:'ff00ff'
            }
        },
        //单元格的背景颜色
        fill:{
          //注意十六进制不带#
          rgb:'ff0000'
        },
        //单元格对其方式
        alignment:{
          horizontal:'center',
          vertical:'center',
          wrap_text:true
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
