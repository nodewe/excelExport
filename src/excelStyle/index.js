
import xlsxStyle from 'xlsx-style'
export default worksheet=>{
    // console.log(worksheet,'worksheet')
    
    const cellStyle =  {
        //字体属性
        font:{
            sz:16,
            bold:true,
            // color:{
            //   rgb:'ff00ff'
            // }
        },
        // //单元格的背景颜色
        // fill:{
        //   //注意十六进制不带#
        //   rgb:'ff0000'
        // },
        // //单元格对其方式
        // alignment:{
        //   horizontal:'center',
        //   vertical:'center',
        //   wrap_text:true
        // }
    };

    const cells = ['A','B','C','D'];
    //开始单元格
    const startCell = xlsxStyle.utils.decode_cell('A1');
    // 结束单元格
    const endCell =  xlsxStyle.utils.decode_cell('D1');
    // 合并单元格
    worksheet['!merges'] = [
      {s:startCell,e:endCell}
    ]
    //A1 单元格 设置文本
    worksheet['A1'] = {
      v:'花名册',
      s:{
        font:{
          sz:20,
          bold:true
        },
        alignment:{
          horizontal:'center',
          vertical:'center',
        }
      }
    }
    // 给每个单元格设置宽度
    worksheet['!cols'] = Array.from({length:cells.length},()=>({wch:50}))

    // 设置样式的范围
    for (const cell of cells) {
        //如果存在 就写入对应的样式 由于表头是从2开始的  所以从2开始设置
        if(worksheet[`${cell}2`]){
            worksheet[`${cell}2`].s = cellStyle
        }
        
    }
}
